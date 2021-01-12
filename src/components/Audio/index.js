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
import firebase from "firebase"
import { app } from '../../database'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios"
import OptimizedField from "../App/OptimizedTextField"



const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));







const Audio = (props) => {
	const classes = useStyles();
	const [isEdit, setIsEdit] = React.useState(false)
	const [showModal, setShowModal] = React.useState(false)
	const [uploadMedia, setUploadMedia] = React.useState(null)
	const [ArrayData, setArrayData] = React.useState([])
	const [loader, setLoader] = React.useState(false)
	const [isOPenSnackBar, setIsOpenSnackBar] = React.useState(false)
	const [currentItem, setCurrentItem] = React.useState(null)

	const [snackData, setSnackData] = React.useState({
		isOPen: false,
		snackbarMessage: null,
		severity: null
	})

	const [inputs, setInputs] = React.useState({
		title: "",
		price: "",
		description: ""
	})

	React.useEffect(() => {
		firebase.database().ref("audio").on("value", snapshot => {
			let data = snapshot.val() ? snapshot.val() : {}
			let Items = { ...data }
			setArrayData(Items)
		})
	}, [])
	const handleSnackClose = (event, reason,) => {
		if (reason === 'clickaway') {
			return;
		}
		setIsOpenSnackBar(false)
	}

	const keys = Object.keys(ArrayData)

	const onClose = () => {
		setShowModal(false)
		setInputs({
			title: "",
			price: "",
			description: ""
		})
	}
	const handleEdit = (val) =>{
		setCurrentItem(val)
		let cardData = ArrayData[val]
		setIsEdit(true)
		setShowModal(true)
		setInputs({
			title: cardData.title,
			price: cardData.price,
			description: cardData.description
		})
		setUploadMedia(cardData.audio)
	}
	const onSubmit = () => {
		alert('called')
		isEdit ? 
		firebase.database().ref(`audio/${currentItem}`).update({ ...data }).then(res => {
			onClose()
			setInputs({
				title: "",
				price: "",
				description: ""
			})
			setSnackData({
				isOPen: true,
				snackbarMessage: 'Audio Updated  Succesfully',
				severity: 'success'
			})
			setIsOpenSnackBar(true)
		}).catch((err) => {
			alert(err)
			onClose()
			setSnackData({
				isOPen: true,
				snackbarMessage: 'Failed to Update Audio',
				severity: 'error'
			})
		})
		
		
		:
		firebase.database().ref(`audio`).push({
			...data
		}).then((res) => {
			onClose()
			setInputs({
				title: "",
				price: "",
				description: ""
			})
			setSnackData({
				isOPen: true,
				snackbarMessage: 'Audio Added Succesfully',
				severity: 'success'
			})

		}).catch((err) => {
			alert(err)
			onClose()
			setSnackData({
				isOPen: true,
				snackbarMessage: 'Failed to Add Audio',
				severity: 'error'
			})
		})
	}

	const renderDialogContent = () => {
		const inputRef = React.createRef()

		const handleOpenfileselect = () => {
			inputRef.current.click()
		}

		const handleUploadChange = (e) => {
			setLoader(true)
			const formData = new FormData()
			formData.append("file", e.target.files[0])
			formData.append("upload_preset", "shp8jses")

			axios.post("https://api.cloudinary.com/v1_1/duqizyqzf/upload", formData)
				.then((res) => {
					setUploadMedia(res.data.secure_url)
					setLoader(false)
				}).catch((err) => {
					// alert("something went wrong")
					setLoader(false)
				})
		}

		const onChange = (e) => {
			setInputs({
				...inputs,
				[e.target.name]: e.target.value
			})
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
					<OptimizedField
						name="title"
						type="text"
						placeholder="Title"
						onChange={onChange}
						value={inputs.title}
					/>
				</div>
				<div class="col-md-6 col-sm-12" style={{ marginBottom: '12px' }}>

					<OptimizedField
						name="price"
						type="text"
						placeholder="Price"
						label="Price"
						onChange={onChange}
						value={inputs.price}
					/>
				</div>
				<div class="col-md-12 col-sm-12" style={{ marginBottom: '12px' }}>
					<OptimizedField
						name="description"
						type="text"
						placeholder="Description"
						onChange={onChange}
						value={inputs.description}
					/>
				</div>
				<div class="col-md-8 col-sm-12" style={{ marginBottom: '12px' }}>
					{uploadMedia &&
						<ReactAudioPlayer
							src={uploadMedia}
							controls
							style={{ width: '300px', height: '41px', marginTop: '17px' }}
						/>}
				</div>
				<div class="col-md-4 col-sm-12" style={{ marginBottom: '12px' }}>
					{loader ? <CircularProgress /> :
						uploadMedia != null ?
							<Button style={{ height: '41px', marginTop: '17px' }} variant="contained" fullWidth color="secondary" onClick={() => setUploadMedia(null)}>
								Remove Audio
  							</Button>
							:
							<Button onClick={() => handleOpenfileselect()} style={{ height: '41px', marginTop: '17px' }} variant="contained" fullWidth color="secondary">
								Upload Audio
						  </Button>
					}
				</div>

			</div>
		)
	}
	const data = {
		title: inputs.title,
		price: inputs.price,
		description: inputs.description,
		audio: uploadMedia
	}

	return (
		<div style={{ padding: '20px' }} >
			<Snackbar open={isOPenSnackBar} autoHideDuration={4000} onClose={handleSnackClose}  >
				<Alert severity={snackData.severity}>
					{snackData.snackbarMessage}
				</Alert>
			</Snackbar>
			<CustomDialog title={ isEdit? 'Edit Audio':'Add New Audio'} renderDialogBody={() => renderDialogContent()} onSubmit={onSubmit} isOPen={showModal} onClose={onClose} />
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<h2>	All Audios			</h2>
				<Button variant="contained" color="secondary" onClick={() => setShowModal(true)}>
					Upload Audio
  				</Button>
			</div>
			<div class="row">
				{
					keys.map(val => {
						return (
							<div class="col-md-4 col-sm-12">
								<MediaCard
									editVideo={() => handleEdit(val)}
									renderkey={val}
									data={ArrayData[val]}
									handleOPenSnack={() => {
										setIsOpenSnackBar(true)
										setSnackData({
											snackbarMessage: 'Audio Deleted Succesfully',
											severity: 'success',
											isOPen: true
										})
									}}>
									<ReactAudioPlayer
										src={ArrayData[val].audio}
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