import { combineReducers } from 'redux';
import AppReducers from './Reducers';
import BusinessReducers from '../../../redux/reducers';

const createReducer = asyncReducers =>
	combineReducers({
        BusinessReducers,
		AppReducers,
		...asyncReducers
	});

export default createReducer;
