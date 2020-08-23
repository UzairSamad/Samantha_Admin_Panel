import React, { Component } from 'react';

import TableView from '../../components/TableView';

const ListsContainer = (props) => {

    const ListComponent = props.listComponent;

    return (
        <ListComponent {...props}/>
    )

}

export default ListsContainer;