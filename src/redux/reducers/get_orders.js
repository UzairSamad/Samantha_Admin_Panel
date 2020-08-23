import {
    ORDER_DETAILS_PENDING,
     ORDER_DETAILS_FULFILLED,
    ORDER_DETAILS_REJECTED, 
    ORDER_DETAILS_EMPTY
}from '../../constants/ActionTypes'

import initialState from '../../store/initialState'

export default (state=initialState.order_Details,action)=>{

    switch(action.type){
        case ORDER_DETAILS_REJECTED:
            return {
                in_progress:false,
                order_response:{},
                order_error:action.payload
            }
            break;
        case ORDER_DETAILS_PENDING:
            return {
                in_progress:true,
                order_response:{},
                order_error:{},
         
            }
            break;
            case ORDER_DETAILS_FULFILLED:
                return {
                    in_progress:false,
                    order_response:action.payload,
                    order_error:{},
                    
 }
                break;
        case ORDER_DETAILS_EMPTY:
            return {
                in_progress:false,
                order_response:{},
                order_error:{}
            }
            break;

            default: 
             return state
    }
}
