import {
    SERVICE_INDUSTRIES_LIST_EMPTY,
    SERVICE_INDUSTRIES_LIST_FULFILLED,
    SERVICE_INDUSTRIES_LIST_REJECTED,
    SERVICE_INDUSTRIES_LIST_PENDING
} from '../../constants/ActionTypes'

import initialState from '../../store/initialState'

export default (state = initialState.service_industries_list, action) => {
    switch (action.type) {
        case SERVICE_INDUSTRIES_LIST_REJECTED:
            return {
                in_progress: false,
                service_industries_list_response: {
                    list: {
                        list: []
                    }
                },
                service_industries_list_error: action.payload
            }
            break;
        case SERVICE_INDUSTRIES_LIST_PENDING:
            return {
                in_progress: true,
                service_industries_list_response: {
                    list: {
                        list: []
                    }
                },
                service_industries_list_error: {},
            }
            break;
        case SERVICE_INDUSTRIES_LIST_FULFILLED:
            return {
                in_progress: false,
                service_industries_list_response: action.payload,
                service_industries_list_error: {},

            }
            break;
        case SERVICE_INDUSTRIES_LIST_EMPTY:
            return {
                in_progress: false,
                service_industries_list_response: {
                    list: {
                        list: []
                    }
                },
                service_industries_list_error: {}
            }
            break;
        default:
            return state
    }
}
