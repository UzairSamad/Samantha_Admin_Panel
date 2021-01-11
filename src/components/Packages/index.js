import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//importing service components
import AudioPackage from './AudioPackage'
import VideoPackage from './VideoPackage'









const Packages = (props) => {
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
					<Tab label="Audio Packages" />
					<Tab label="Video Packages" />
				</Tabs>
			</Paper>
			{
				value === 0 ? <AudioPackage /> : <VideoPackage />
			}

		</div>


	)

}

export default Packages;