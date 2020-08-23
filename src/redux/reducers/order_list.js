import {
    ORDER_LIST_PENDING,
    ORDER_LIST_FULFILLED,
    ORDER_LIST_REJECTED,
    ORDER_LIST_EMPTY
} from '../../constants/ActionTypes'

import initialState from '../../store/initialState'

export default (state = initialState.order_list, action) => {

    switch (action.type) {
        case ORDER_LIST_REJECTED:
            return {
                in_progress: false,
                order_list_response: {},
                order_list_error: action.payload
            }
            break;
        case ORDER_LIST_PENDING:
            return {
                in_progress: true,
                order_list_response: {},
                order_list_error: {},
            }
            break;
        case ORDER_LIST_FULFILLED:
            return {
                in_progress: false,
                order_list_response: action.payload,
                order_list_error: {},

            }
            break;
        case ORDER_LIST_EMPTY:
            return {
                in_progress: false,
                order_list_response: {},
                order_list_error: {}
            }
            break;
        default:
            return state
    }
}
