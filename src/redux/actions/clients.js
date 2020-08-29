import {
    CLIENT_LIST
} from '../../constants/ActionTypes'

import { listing } from '../../apis/listing'

export const clients_list_action = (params) => ({
    type: CLIENT_LIST,
    payload: listing(params)
})    
