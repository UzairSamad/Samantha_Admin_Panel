import React, { Component } from 'react';
import TableHeader from './TableHeader'
import TableData from './TableData'
import TableContainer from '@material-ui/core/TableContainer';




class TableView extends Component {
    
   
    render() {
        const header=this.props.header
        const orders= this.props.orders
        const rendertablerowdata = this.props.rendertablerowdata

        return (
            <TableContainer>
            <TableHeader header={header}/>
  
           <TableData orders={orders} rendertablerowdata={rendertablerowdata}/>
            
            </TableContainer>
        )
    }
}

export default TableView;