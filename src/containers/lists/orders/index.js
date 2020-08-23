import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TableView from '../../../components/TableView'

import { actions } from '../../../redux';

const { orders_list_action } = actions;

class OrdersList extends Component {

    listDisplay = () => {
        return [
            {
                key: "order_number",
                title: "Order Number",
            },
            {
                key: "tracking_code",
                title: "Tracking Code",
            },
            {
                key: "state",
                title: "Order State",
            },
            {
                key: "address",
                title: "Street Address",
            },
            {
                key: "gps_address",
                title: "GPS Address"
            }
        ];
    }

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
        return (
            <div>
                <TableView loading={this.props.orders.in_progress} rows={this.props.orders.order_list_response.list.list} tableDisplay={this.listDisplay()} />
            </div>
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