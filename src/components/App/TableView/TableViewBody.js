import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Icon from '@material-ui/core/Icon'

import ProgressIndicator from '../ProgressIndicator';

class TableViewBody extends Component {
    render() {
        const rows = this.props.rows || [];
        const renderRows = this.props.renderRows || [];
        const columns = this.props.totalColumns;

        return (
            <TableBody>
                {
                    this.props.loading &&
                    <TableRow key={`row_loader_visible`} colSpan={columns}>
                        <TableCell key={`loader_cell_visible`} colSpan={columns} align="center">
                            <ProgressIndicator />
                        </TableCell>
                    </TableRow>
                }
                {rows.length > 0 &&
                    rows.map((row, i) => {
                        return (
                            <TableRow key={`row_data_${i}`}>
                                {
                                    renderRows.map((x) => {
                                        if (row[x.key]) {
                                            if (typeof row[x.key] === 'function') {
                                                return row[x.key].render(row);
                                            }
                                            else if (typeof row[x.key] === 'boolean') {
                                                return (
                                                    <TableCell key={`${x.key}_cell_${i}`} align="center">
                                                        <Icon>{row[x.key] === true ? 'check_circle' : 'cancel'}</Icon>
                                                    </TableCell>
                                                )
                                            }
                                            else {
                                                return (
                                                    <TableCell key={`${x.key}_cell_${i}`} align="center">
                                                        {row[x.key]}
                                                    </TableCell>
                                                )
                                            }
                                        }
                                    })
                                }
                            </TableRow>
                        )
                    })
                }
                {
                    !this.props.loading && rows.length === 0 &&
                    <TableRow key={`loader_cell_no_data_row`} colSpan={columns}>
                        <TableCell key={`loader_cell_no_data`} colSpan={columns} align="center">
                            No data to display.
                        </TableCell>
                    </TableRow>
                }
            </TableBody>
        )
    }
}

export default TableViewBody;