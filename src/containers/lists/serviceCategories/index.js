import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TableView from '../../../components/App/TableView'

import AppActions from '../../../components/App/Redux/Actions';

const { BusinessActions } = AppActions;

const { serviceCategories } = BusinessActions;

const { service_categories_list_action } = serviceCategories;

class ServiceCategoriesList extends Component {

    listDisplay = () => {
        return [
            {
                key: "name",
                title: "Name",
            },
            {
                key: "category_code",
                title: "Category Code"
            },
            {
                key: "subcategory",
                title: "Sub-Category",
            },
            {
                key: "slug",
                title: "Slug",
            },
            {
                key: "enabled",
                title: "Enable",
            },
        ];
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        this.props.service_categories_list_action({
            meta: {
                entity: "serviceCategories",
                page: 0,
                limit: 10,
            },
            props: {
                fields: [
                    "name",
                    "category_code",
                    "subcategory",
                    "slug",
                ]
            }
        });
    }

    render() {
        return (
            <div>
                <TableView loading={this.props.serviceCategories.in_progress} rows={this.props.serviceCategories.service_categories_list_response.list.list} tableDisplay={this.listDisplay()} />
            </div>
        )
    }
}

const mapStateToProps = ({ BusinessReducers }) => ({
    serviceCategories: BusinessReducers.service_cateogries_list
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ service_categories_list_action }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceCategoriesList)