import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MediaCard from '../App/Card'
import './style.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CustomDialog from '../App/Dialog'
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));







const Video = (props) => {
	const classes = useStyles();
	const [showModal, setShowModal] = React.useState(false)
	const [videos, setValue] = React.useState([
		{
			title: 'Video Title Here',
			description: 'Video Description Here',
			url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1'
		},
		{
			title: 'Sample 1',
			description: 'Video Description Here',
			url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
		},
		{
			title: 'Sample 2',
			description: 'Video Description Here',
			url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
		},

	]);

	const renderDialogContent = () => {
		return (
			<div style={{ padding: '20px ' }}>
				<div>
				{/* <input style={{}} type='text' /> */}
				</div>
				<div>
				<InputLabel>Title</InputLabel>
				<TextField id="outlined-basic" variant="outlined" />
				</div>
			</div>
		)
	}
	return (
		<div style={{ padding: '20px' }} >
			<CustomDialog title={'Add New Video'} renderDialogBody={() => renderDialogContent()} isOPen={showModal} onClose={() => { setShowModal(false) }} />

			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<h2>	All Videos			</h2>
				<Button variant="contained" color="secondary" onClick={() => setShowModal(true)}>
					Upload Video
  				</Button>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
				{
					videos.map(val => {
						return (
							<MediaCard data={val} />
						)
					})
				}


			</div>
		</div>


	)

}

export default Video;