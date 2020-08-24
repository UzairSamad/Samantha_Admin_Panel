import React, { Component } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
class TableHeader extends Component {
    

    render() {

        const header=this.props.header
        return (
            <TableHead >
            <TableRow>
              {header.map((head) => (
                <TableCell>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )
    }
}

export default TableHeader;