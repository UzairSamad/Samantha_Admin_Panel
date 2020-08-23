import { combineReducers } from 'redux';

import client_auth from './client_auth';
import order_list from './order_list'

const appReducers = combineReducers({
    client_auth,
    order_list
})

export default appReducers;