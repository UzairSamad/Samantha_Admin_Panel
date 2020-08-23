import {
    CLIENT_AUTH_PENDING,
    CLIENT_AUTH_FULFILLED,
    CLIENT_AUTH_REJECTED,
    CLIENT_AUTH_EMPTY
} from '../../constants/ActionTypes'

import initialState from '../../store/initialState'

export default (state = initialState.client_auth, action) => {
    switch (action.type) {
        case CLIENT_AUTH_REJECTED:
            return {
                in_progress: false,
                client_auth_response: {},
                client_auth_error: action.payload
            }
            break;
        case CLIENT_AUTH_PENDING:
            return {
                in_progress: true,
                client_auth_response: {},
                client_auth_error: {},
            }
            break;
        case CLIENT_AUTH_FULFILLED:
            return {
                in_progress: false,
                client_auth_response: action.payload,
                client_auth_error: {},

            }
            break;
        case CLIENT_AUTH_EMPTY:
            return {
                in_progress: false,
                client_auth_response: {},
                client_auth_error: {}
            }
            break;
        default:
            return state
    }
}
