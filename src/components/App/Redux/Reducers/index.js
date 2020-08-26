import { combineReducers } from 'redux';
import navbar from './navbar.reducer';
import settings from './settings.reducer';
import navigation from './navigation.reducer';

const AppReducers = combineReducers({
	navbar,
	settings,
	navigation,
});

export default AppReducers;
