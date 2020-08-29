import {
    CLIENT_LIST_PENDING,
    CLIENT_LIST_FULFILLED,
    CLIENT_LIST_REJECTED,
    CLIENT_LIST_EMPTY
} from '../../constants/ActionTypes'

import initialState from '../../store/initialState'

export default (state = initialState.client_list, action) => {
    switch (action.type) {
        case CLIENT_LIST_REJECTED:
            return {
                in_progress: false,
                client_list_response: {
                    list: {
                        list: []
                    }
                },
                client_list_error: action.payload
            }
            break;
        case CLIENT_LIST_PENDING:
            return {
                in_progress: true,
                client_list_response: {
                    list: {
                        list: []
                    }
                },
                client_list_error: {},
            }
            break;
        case CLIENT_LIST_FULFILLED:
            return {
                in_progress: false,
                client_list_response: action.payload,
                client_list_error: {},

            }
            break;
        case CLIENT_LIST_EMPTY:
            return {
                in_progress: false,
                client_list_response: {
                    list: {
                        list: []
                    }
                },
                client_list_error: {}
            }
            break;
        default:
            return state
    }
}
