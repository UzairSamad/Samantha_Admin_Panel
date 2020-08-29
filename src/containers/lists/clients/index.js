import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TableView from '../../../components/App/TableView'

import AppActions from '../../../components/App/Redux/Actions';

const { BusinessActions } = AppActions;

const { clients } = BusinessActions;

const { clients_list_action } = clients;

class ClientsList extends Component {

    listDisplay = () => {
        return [
            {
                key: "client_consumer",
                title: "Consumer",
            },
            {
                key: "client_class",
                title: "Class"
            },
            {
                key: "client_host",
                title: "Host",
            },
            {
                key: "client_type",
                title: "Type",
            },
        ];
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        this.props.clients_list_action({
            meta: {
                entity: "clients",
                page: 0,
                limit: 10,
            },
            props: {
                fields: [
                    "client_consumer",
                    "client_class",
                    "enabled",
                    "client_type",
                    "client_host",
                ]
            }
        });
    }

    render() {
        return (
            <div>
                <TableView loading={this.props.clients.in_progress} rows={this.props.clients.client_list_response.list.list} tableDisplay={this.listDisplay()} />
            </div>
        )
    }
}

const mapStateToProps = ({ BusinessReducers }) => ({
    clients: BusinessReducers.client_list
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ clients_list_action }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsList)