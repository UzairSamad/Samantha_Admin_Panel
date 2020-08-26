import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppPageCarded from '../App/AppPageCarded';
import OrdersList from '../../containers/lists/orders';

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function Dashboard(props) {
    const classes = useStyles(props);

	return (
		<AppPageCarded
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h4>{'Dashboard'}</h4>
				</div>
			}
			// contentToolbar={
			// 	<div className="px-24">
			// 		<h4>Content Toolbar</h4>
			// 	</div>
			// }
			content={
				<div className="p-24">
					<h4>Content</h4>
					<br />
					<OrdersList />
				</div>
			}
		/>
	);
}

export default Dashboard;