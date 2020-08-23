import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { OrderDetailsSuccess } from '../../redux/actions/get_orders'

class OrderDetails extends React.Component{

componentDidMount(){
  this.fetchData()
}
    
    fetchData(){
        const params =
        {
            "meta": {
                "entity": "orders",
                "page": 0,
                "limit": 10
            },
            "props": {
                "fields": [
                    "address",
                    "gps_address",
                    "tracking_code",
                    "order_number",
                    "state"
                    
                ]
            }
        }
        this.props.OrderDetailsSuccess(params)
    }
    render(){
        
    console.log(this.props.order_Details.order_response.list)
//  console.log(orderDetails,'orderDetails')
        return (
            <h1>Details</h1>
        )
    }
}

const mapStateToProps = (state)=>({
    order_Details:state.order_Details
})

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({OrderDetailsSuccess},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderDetails)