import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions } from '../../redux';

const { orders_list_action } = actions;

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
        const orders = this.props.orders.order_list_response.list;

        console.log("ORDERS LIST >", orders);
        
        return (
            <h1>Details</h1>
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