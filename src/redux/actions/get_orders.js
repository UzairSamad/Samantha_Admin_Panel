import {
    ORDER_DETAILS_PENDING,
    ORDER_DETAILS_FULFILLED,
    ORDER_DETAILS_REJECTED, 
    ORDER_DETAILS
} from '../../constants/ActionTypes'
import {listing} from '../../apis/listing'



export const OrderDetailsSuccess = (params) =>({
    type:ORDER_DETAILS,
    payload:listing(params)
})    


// export const OrderDetails  = () => {
//     return dispatch=>{

//     }
// }