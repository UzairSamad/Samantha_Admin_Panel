import navigationConfig from '../../Settings/AppNavigation';

import AppActions from '../Actions';

const initialState = navigationConfig;

const navigation = (state = initialState, action) => {
	switch (action.type) {
		case AppActions.navigation.GET_NAVIGATION: {
			return [...state];
		}
		case AppActions.navigation.SET_NAVIGATION: {
			return [...action.navigation];
		}
		case AppActions.navigation.RESET_NAVIGATION: {
			return [...initialState];
		}
		default: {
			return state;
		}
	}
};

export default navigation;
