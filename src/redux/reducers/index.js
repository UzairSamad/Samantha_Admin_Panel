import { combineReducers } from 'redux';

import order_list from './order_list'
import client_list from './client_list'
import service_industries_list from './serviceIndustries_list'
import service_cateogries_list from './serviceCategories_list'

const BusinessReducers = combineReducers({
    order_list,
    client_list,
    service_industries_list,
    service_cateogries_list
})

export default BusinessReducers;