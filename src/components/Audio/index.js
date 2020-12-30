import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MediaCard from '../App/AudioCard'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CustomDialog from '../App/Dialog'
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import ReactAudioPlayer from 'react-audio-player';




const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));







const Audio = (props) => {
	const classes = useStyles();
	const [showModal, setShowModal] = React.useState(false)
	const [uploadMedia, setUploadMedia] = React.useState(null)
	const [audio, setAudio] = React.useState([

		{
			title: 'SampleAudio  1',
			description: 'Audio Description Here',
			url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
			price: '$10'
		},
		{
			title: 'Test Audio',
			description: 'Audio Description Here',
			url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
			price: '$10'
		},
		{
			title: 'Test Audio',
			description: 'Audio Description Here',
			url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
			price: '$550'
		},
		{
			title: 'Test',
			description: 'Audio Description Here',
			url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
			price: '$5'
		},
		{
			title: 'Test',
			description: 'Audio Description Here',
			url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
			price: '$410'
		},
		{
			title: 'Test Audio',
			description: 'Audio Description Here',
			url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
			price: '$104'
		},
		{
			title: 'Test Audio',
			description: 'Audio Description Here',
			url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
			price: '$104'
		},
		{
			title: 'Test Audio',
			description: 'Audio Description Here',
			url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
			price: '$104'
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
				<div class="col-md-8 col-sm-12" style={{ marginBottom: '12px' }}>
					{uploadMedia && <ReactAudioPlayer
						src={uploadMedia}
						controls
						style={{ width: '300px', height: '41px', marginTop: '17px' }}
					/>}
				</div>
				<div class="col-md-4 col-sm-12" style={{ marginBottom: '12px' }}>
					<Button onClick={() => handleOpenfileselect()} style={{ height: '41px', marginTop: '17px' }} variant="contained" fullWidth color="secondary">
						Upload Audio
  				</Button>
				</div>

			</div>
		)
	}
	return (
		<div style={{ padding: '20px' }} >
			<CustomDialog title={'Add New Audio'} renderDialogBody={() => renderDialogContent()} isOPen={showModal} onClose={() => { setShowModal(false) }} />

			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<h2>	All Audios			</h2>
				<Button variant="contained" color="secondary" onClick={() => setShowModal(true)}>
					Upload Audio
  				</Button>
			</div>
			<div class="row">
				{
					audio.map(val => {
						return (
							<div class="col-md-4 col-sm-12">
								<MediaCard data={val}>
									<ReactAudioPlayer
										src={val.url}
										controls
										style={{ width: '250px', marginBottom: "10px" }}
									/>
								</MediaCard>

							</div>
						)
					})
				}

			</div>
		</div>
	)

}

export default Audio;