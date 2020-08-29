import {
    SERVICE_INDUSTRIES_LIST
} from '../../constants/ActionTypes'

import { listing } from '../../apis/listing'

export const service_industries_list_action = (params) => ({
    type: SERVICE_INDUSTRIES_LIST,
    payload: listing(params)
})    