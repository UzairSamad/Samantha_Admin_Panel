import {
    SERVICE_CATEGORIES_LIST_EMPTY,
    SERVICE_CATEGORIES_LIST_FULFILLED,
    SERVICE_CATEGORIES_LIST_REJECTED,
    SERVICE_CATEGORIES_LIST_PENDING
} from '../../constants/ActionTypes'

import initialState from '../../store/initialState'

export default (state = initialState.service_categories_list, action) => {
    switch (action.type) {
        case SERVICE_CATEGORIES_LIST_REJECTED:
            return {
                in_progress: false,
                service_categories_list_response: {
                    list: {
                        list: []
                    }
                },
                service_categories_list_error: action.payload
            }
            break;
        case SERVICE_CATEGORIES_LIST_PENDING:
            return {
                in_progress: true,
                service_categories_list_response: {
                    list: {
                        list: []
                    }
                },
                service_categories_list_error: {},
            }
            break;
        case SERVICE_CATEGORIES_LIST_FULFILLED:
            return {
                in_progress: false,
                service_categories_list_response: action.payload,
                service_categories_list_error: {},

            }
            break;
        case SERVICE_CATEGORIES_LIST_EMPTY:
            return {
                in_progress: false,
                service_categories_list_response: {
                    list: {
                        list: []
                    }
                },
                service_categories_list_error: {}
            }
            break;
        default:
            return state
    }
}
