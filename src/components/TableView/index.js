import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';

import TableViewHeader from './TableViewHeader'
import TableViewBody from './TableViewBody'

class TableView extends Component {
    render() {
        return (
            <TableContainer>
                <Table>
                    <TableViewHeader loading={this.props.loading} headers={this.props.tableDisplay} />
                    <TableViewBody loading={this.props.loading} rows={this.props.rows} renderRows={this.props.tableDisplay} totalColumns={this.props.tableDisplay.length} />
                </Table>
            </TableContainer>
        )
    }
}

export default TableView;