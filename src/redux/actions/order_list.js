import {
    ORDER_LIST
} from '../../constants/ActionTypes'

import { listing } from '../../apis/listing'

export const orders_list_action = (params) => ({
    type: ORDER_LIST,
    payload: listing(params)
})    
