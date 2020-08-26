import _ from 'lodash';
import { createMuiTheme } from '@material-ui/core/styles';

import {
	defaultSettings,
	defaultThemeOptions,
	defaultThemes,
	extendThemeWithMixins,
	getParsedQuerySettings,
	mainThemeVariations,
	mustHaveThemeOptions
} from '../../Settings';


import AppSettingsConfig from '../../Settings/AppSettings';
import AppThemeConfig from '../../Settings/AppTheme';
import AppLayoutConfig from '../../Settings/AppLayout';

import AppActions from '../Actions';

const themesObjRaw = Object.keys(AppThemeConfig).length !== 0 ? AppThemeConfig : defaultThemes;
const initialSettings = getInitialSettings();
const initialThemes = getInitialThemes();

const initialState = {
	initial: initialSettings,
	defaults: _.merge({}, initialSettings),
	current: _.merge({}, initialSettings),
	themes: initialThemes,
	...getThemeOptions(initialThemes, initialSettings)
};

const settings = (state = initialState, action) => {
	switch (action.type) {
		case AppActions.settings.SET_SETTINGS: {
			const current = generateSettings(state.defaults, action.value);
			const themes =
				current.theme.main !== state.current.theme.main
					? { ...state.themes, ...updateMainThemeVariations(current.theme.main, state.themes) }
					: state.themes;
			return {
				...state,
				current,
				themes,
				...getThemeOptions(themes, current)
			};
		}
		case AppActions.settings.SET_INITIAL_SETTINGS: {
			return _.merge({}, initialState);
		}
		case AppActions.settings.SET_DEFAULT_SETTINGS: {
			const defaults = generateSettings(state.defaults, action.value);
			let themes =
				defaults.theme.main !== state.defaults.theme.main
					? { ...state.themes, ...updateMainThemeVariations(defaults.theme.main, state.themes) }
					: state.themes;
			themes =
				defaults.direction !== state.defaults.direction
					? updateThemeDirections(themes, defaults.direction)
					: themes;
			return {
				...state,
				defaults: _.merge({}, defaults),
				current: _.merge({}, defaults),
				themes,
				...getThemeOptions(themes, defaults)
			};
		}
		case AppActions.settings.RESET_DEFAULT_SETTINGS: {
			const themes = {
				...state.themes,
				...updateMainThemeVariations(state.defaults.theme.main, state.themes)
			};
			return {
				...state,
				defaults: _.merge({}, state.defaults),
				current: _.merge({}, state.defaults),
				themes,
				...getThemeOptions(themes, state.defaults)
			};
		}
		default: {
			return state;
		}
	}
};

export default settings;

/**
 * SETTINGS
 */
function getInitialSettings() {
	const defaultLayoutStyle =
		AppSettingsConfig.layout && AppSettingsConfig.layout.style ? AppSettingsConfig.layout.style : 'layout1';
	const layout = {
		style: defaultLayoutStyle,
		config: AppLayoutConfig[defaultLayoutStyle].defaults
	};
	return _.merge({}, defaultSettings, { layout }, AppSettingsConfig, getParsedQuerySettings());
}

/**
 * THEMES
 */
function getInitialThemes() {
	const { direction } = initialSettings;

	const themes = Object.assign(
		{},
		...Object.entries(themesObjRaw).map(([key, value]) => {
			const muiTheme = _.merge({}, defaultThemeOptions, value, mustHaveThemeOptions);
			return {
				[key]: createMuiTheme(
					_.merge({}, muiTheme, {
						mixins: extendThemeWithMixins(muiTheme),
						direction
					})
				)
			};
		})
	);

	return {
		...themes,
		...mainThemeVariations({
			...themesObjRaw[initialSettings.theme.main],
			mixins: extendThemeWithMixins(themesObjRaw[initialSettings.theme.main]),
			direction
		})
	};
}

function updateMainThemeVariations(mainTheme, themes) {
	return mainThemeVariations({
		...themesObjRaw[mainTheme],
		mixins: extendThemeWithMixins(themesObjRaw[mainTheme]),
		direction: themes[mainTheme].direction
	});
}

function getThemeOptions(_themes, _settings) {
	return {
		mainTheme: _themes[_settings.theme.main],
		navbarTheme: _themes[_settings.theme.navbar],
		toolbarTheme: _themes[_settings.theme.toolbar],
		footerTheme: _themes[_settings.theme.footer],
		...updateMainThemeVariations(_settings.theme.main, _themes)
	};
}

function updateThemeDirections(themes, direction) {
	const response = {};
	Object.entries(themes).forEach(([key, value]) => {
		response[key] = { ...value, direction };
	});
	return response;
}

export function generateSettings(_defaultSettings, _newSettings) {
	return _.merge(
		{},
		_defaultSettings,
		_newSettings && _newSettings.layout && _newSettings.layout.style
			? { layout: { config: AppLayoutConfig[_newSettings.layout.style].defaults } }
			: {},
		_newSettings
	);
}
