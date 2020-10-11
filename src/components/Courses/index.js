import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//importing service components
import AddCourse from './AddCourse'
import AllCourses from './AllCourses'









const Portfolio = (props) => {
	const [value, setValue] = React.useState(0);
	const handleTabChange = (event, newValue) => {
		console.log(newValue);
		setValue(newValue);
	};

	return (
		<div>
			<Paper square>
				<Tabs
					value={value}
					indicatorColor="primary"
					textColor="primary"
					onChange={handleTabChange}
					aria-label="disabled tabs example"
				>
					<Tab label="Add Course" />
					<Tab label="All Courses" />
				</Tabs>
			</Paper>
			{
				value === 0 ? <AddCourse /> : <AllCourses />
			}

		</div>


	)

}

export default Portfolio;