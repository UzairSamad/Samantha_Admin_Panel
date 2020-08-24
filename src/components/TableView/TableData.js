import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

class TableData extends Component {

    
render() {
            const data=this.props.rendertablerowdata
return (

    this.props.orders.list.map(function(item, i){
   
        return (
            <TableBody>            
            <TableRow key={item.state}>
            <TableCell component="th" scope="row">
              {item.order_number}
            </TableCell>
            <TableCell component="th" scope="row">
              {item.tracking_code}
            </TableCell>
            <TableCell component="th" scope="row">
              {item.state}
            </TableCell>
            <TableCell component="th" scope="row">
              {item.address}
            </TableCell>
            <TableCell component="th" scope="row">
              {item.gps_address}
            </TableCell>

          </TableRow>
          </TableBody>

        )
      })

        )
    }
}

export default TableData;