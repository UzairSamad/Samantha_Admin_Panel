import React, { Component } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class TableViewHeader extends Component {

    render() {
        const headers = this.props.headers || [];
        return (
            <TableHead>
                <TableRow>
                    {headers.map((head) => (
                        <TableCell key={`header_${head.key}`} align="center">
                            {head.title}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }
}

export default TableViewHeader;