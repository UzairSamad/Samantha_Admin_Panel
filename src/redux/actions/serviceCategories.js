import {
    SERVICE_CATEGORIES_LIST
} from '../../constants/ActionTypes'

import { listing } from '../../apis/listing'

export const service_categories_list_action = (params) => ({
    type: SERVICE_CATEGORIES_LIST,
    payload: listing(params)
})    