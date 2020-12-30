import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MediaCard from '../App/Card'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CustomDialog from '../App/Dialog'
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';


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
	const [uploadMedia, setUploadMedia] = React.useState(null)

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
		{
			title: 'Sample 2',
			description: 'Video Description Here',
			url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
		},
		{
			title: 'Sample 2',
			description: 'Video Description Here',
			url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
		},
		{
			title: 'Sample 2',
			description: 'Video Description Here',
			url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
		},
		{
			title: 'Sample 2',
			description: 'Video Description Here',
			url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
		},

	]);

	const renderDialogContent = () => {
		const inputRef = React.createRef()

		const handleOpenfileselect = () => {
			inputRef.current.click()
		}

		const handleUploadChange = (e) => {
			setUploadMedia(URL.createObjectURL(e.target.files[0]))
		}

		return (
			<div class="row">
				<input
					type="file"
					id="file"
					ref={inputRef}
					style={{ display: "none" }}
					onChange={(e) => {
						handleUploadChange(e)
					}}
				/>
				<div class="col-md-6 col-sm-12" style={{ marginBottom: '12px' }}>
					<InputLabel style={{ color: 'black' }} >Title</InputLabel>
					<TextField fullWidth id="outlined-basic" variant="outlined" />
				</div>
				<div class="col-md-6 col-sm-12" style={{ marginBottom: '12px' }}>
					<InputLabel style={{ color: 'black' }}>Price</InputLabel>
					<TextField fullWidth id="outlined-basic" variant="outlined" />
				</div>
				<div class="col-md-12 col-sm-12" style={{ marginBottom: '12px' }}>
					<InputLabel style={{ color: 'black' }} >Description</InputLabel>
					<TextField multiline={true} rows={3} fullWidth id="outlined-basic" variant="outlined" />
				</div>
				<div class="col-md-12 col-sm-12" style={{ marginBottom: '12px' }}>
					{uploadMedia &&
						<CardMedia
							className={classes.media}
							component="iframe"
							src={uploadMedia}
							style={{height: 200}}
						/>}
				</div>
				<div class="col-md-4 col-sm-12" style={{ marginBottom: '12px' }}>
					<Button style={{ height: '41px', marginTop: '17px' }} variant="contained" fullWidth color="secondary" onClick={() => handleOpenfileselect()}>
						Upload Video
  				</Button>
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
			<div class="row">
				{
					videos.map(val => {
						return (
							<div class="col-md-4 col-sm-12">
								<MediaCard data={val} />
							</div>
						)
					})
				}

			</div>
		</div>
	)

}

export default Video;