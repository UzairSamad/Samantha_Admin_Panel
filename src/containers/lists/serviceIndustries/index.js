import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TableView from '../../../components/App/TableView'

import AppActions from '../../../components/App/Redux/Actions';

const { BusinessActions } = AppActions;

const { serviceIndustries } = BusinessActions;

const { service_industries_list_action } = serviceIndustries;

class ServiceIndustriesList extends Component {

    listDisplay = () => {
        return [
            {
                key: "name",
                title: "Name",
            },
            {
                key: "description",
                title: "Description"
            },
            {
                key: "industry_code",
                title: "Industry Code",
            },
            {
                key: "slug",
                title: "Slug",
            },
        ];
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        this.props.service_industries_list_action({
            meta: {
                entity: "serviceIndustries",
                page: 0,
                limit: 10,
            },
            props: {
                fields: [
                    "name",
                    "description",
                    "industry_code",
                    "slug",
                ]
            }
        });
    }

    render() {
        return (
            <div>
                <TableView loading={this.props.serviceIndustries.in_progress} rows={this.props.serviceIndustries.service_industries_list_response.list.list} tableDisplay={this.listDisplay()} />
            </div>
        )
    }
}

const mapStateToProps = ({ BusinessReducers }) => ({
    serviceIndustries: BusinessReducers.service_industries_list
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ service_industries_list_action }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceIndustriesList)