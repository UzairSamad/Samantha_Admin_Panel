import { combineReducers } from 'redux';
import AppReducers from './Reducers';


const createReducer = asyncReducers =>
	combineReducers({
  
		AppReducers,
		...asyncReducers
	});

export default createReducer;
