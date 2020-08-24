import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TableView from '../../components/TableView'
import { actions } from '../../redux';

const { orders_list_action } = actions;
const Header = [ "order_number" ,"tracking_code","state","address","gps_address"]
const RenderTableRowData=["order_number" ,"tracking_code","state","address","gps_address"]

class OrdersList extends Component {

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        this.props.orders_list_action({
            meta: {
                entity: "orders",
                page: 0,
                limit: 10,
            },
            props: {
                fields: [
                    "address",
                    "gps_address",
                    "tracking_code",
                    "order_number",
                    "state"
                ]
            }
        });
    }
    render() {
        const orders = this.props.orders.order_list_response;

        console.log("ORDERS LIST >" , this.props.orders.order_list_response.list);
     
        
        return (
          <TableView orders={orders} header={Header} rendertablerowdata={RenderTableRowData}/>
        )
    }
}

const mapStateToProps = (state) => ({
    orders: state.order_list
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ orders_list_action }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList)