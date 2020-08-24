import React, { Component } from 'react';
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';

const Header = [ "order_number" ,"tracking_code","state","address","gps_address"]

class TableView extends Component {
    

    render() {
       
        const orders= this.props.orders

        return (
            <TableContainer>
                <TableHeader header={Header}/>
                <TableBody orders={orders} />
            </TableContainer>
        )
    }
}

export default TableView;