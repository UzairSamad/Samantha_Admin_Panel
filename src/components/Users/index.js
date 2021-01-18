import React from 'react';
import MediaCard from '../App/Card'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CustomDialog from '../App/Dialog'
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios"
import Select from '@material-ui/core/Select';
import OptimizedField from "../App/OptimizedTextField"
import firebase from "firebase"
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import fire from "../../database"

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	formControl: {
		marginTop: theme.spacing(2),
		minWidth: 300,
	},
}));







const Video = (props) => {
	const classes = useStyles();
	const [showModal, setShowModal] = React.useState(false)
	const [isEdit, setIsEdit] = React.useState(false)
	const [uploadMedia, setUploadMedia] = React.useState(null)
	const [thumbnailImage, setThumbnailImage] = React.useState(null)
	const [ArrayData, setArrayData] = React.useState([])
	const [loader, setLoader] = React.useState(false)
	const [isOPenSnackBar, setIsOpenSnackBar] = React.useState(false)
	const [currentItem, setCurrentItem] = React.useState(null)
	const [videoLoader, setVideoLoad] = React.useState(false)
	const [state, setState] = React.useState({
		age: '',
		name: 'hai',
	});

	const [inputs, setInputs] = React.useState({
		title: "",
		price: "",
		description: ""
	})
	const [snackData, setSnackData] = React.useState({
		isOPen: false,
		snackbarMessage: null,
		severity: null
	})

	React.useEffect(() => {
		firebase.database().ref("users").on("value", snapshot => {
			let data = snapshot.val() ? snapshot.val() : {}
			let Items = { ...data }
			setArrayData(Items)
			console.log('Items', Items)
		})
	}, [])

	const keys = Object.keys(ArrayData)

	const handleSnackClose = (event, reason,) => {
		if (reason === 'clickaway') {
			return;
		}
		setIsOpenSnackBar(false)
	}

	const renderDialogContent = () => {
		const inputRef = React.createRef()
		const inputImageRef = React.createRef()

		const handleOpenfileselect = (ref) => {
			ref.current.click()
		}

		const handleUploadChange = (e) => {
			setVideoLoad(true)
			const formData = new FormData()
			formData.append("file", e.target.files[0])
			formData.append("upload_preset", "shp8jses")
			axios.post("https://api.cloudinary.com/v1_1/duqizyqzf/upload", formData)
				.then((res) => {
					setUploadMedia(res.data.secure_url)
					setVideoLoad(false)
				}).catch((err) => {
					// alert("something went wrong")
					setVideoLoad(false)
				})
		}


		const handleThumbnailchange = (e) => {
			setLoader(true)
			const formData = new FormData()
			formData.append("file", e.target.files[0])
			formData.append("upload_preset", "shp8jses")
			axios.post("https://api.cloudinary.com/v1_1/duqizyqzf/upload", formData)
				.then((res) => {
					setThumbnailImage(res.data.secure_url)
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
			<>

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
					<input
						type="file"
						id="file"
						ref={inputImageRef}
						style={{ display: "none" }}
						onChange={(e) => {
							handleThumbnailchange(e)
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
						{/* <InputLabel style={{ color: 'black' }} >Description</InputLabel> */}
						<OptimizedField
							name="description"
							type="text"
							placeholder="Description"
							onChange={onChange}
							value={inputs.description}
						/>
					</div>
					<div class="col-md-6 col-sm-12" style={{ marginBottom: '12px' }}>
						{uploadMedia &&
							<CardMedia
								className={classes.media}
								component="iframe"
								src={uploadMedia}
								style={{ height: 200 }}
							/>}
					</div>
					<div class="col-md-6 col-sm-12" style={{ marginBottom: '12px' }}>
						{thumbnailImage &&
							<img style={{ height: '200px' }} src={thumbnailImage} />
						}
					</div>
					<div class="col-md-4 col-sm-12" style={{ marginBottom: '12px' }}>
						{videoLoader ? <CircularProgress /> :
							uploadMedia != null ?
								<Button style={{ height: '41px', marginTop: '17px' }} variant="contained" fullWidth color="secondary" onClick={() => setUploadMedia(null)}>
									Remove Video
  							</Button>
								:
								<Button style={{ height: '41px', marginTop: '17px' }} variant="contained" fullWidth color="secondary" onClick={() => handleOpenfileselect(inputRef)}>
									Upload Video
  							</Button>
						}
					</div>

					<div class="col-md-4 col-sm-12" style={{ marginBottom: '12px' }}>
						{loader ? <CircularProgress /> :
							thumbnailImage != null ?
								<Button style={{ height: '41px', marginTop: '17px' }} variant="contained" fullWidth color="secondary" onClick={() => setThumbnailImage(null)}>
									Remove Thumbnail
  							</Button>
								:
								<Button style={{ height: '41px', marginTop: '17px' }} variant="contained" fullWidth color="secondary" onClick={() => handleOpenfileselect(inputImageRef)}>
									Add Thumbnail
  							</Button>
						}
					</div>

				</div>
			</>
		)
	}
	const onClose = () => {
		setShowModal(false)
		setInputs({
			title: "",
			price: "",
			description: ""
		})
		setUploadMedia(null)
		setLoader(false)
	}
	const handleSelectChange = (event) => {
		const name = event.target.name;
		setState({
			...state,
			[name]: event.target.value,
		});
	};

	const handleEdit = (val) => {
		setCurrentItem(val)
		let cardData = ArrayData[val]
		setIsEdit(true)
		setShowModal(true)
		setInputs({
			title: cardData.title,
			price: cardData.price,
			description: cardData.description
		})
		setUploadMedia(cardData.video)
	}
	const onSubmit = () => {
		isEdit ?
			firebase.database().ref(`videos/${currentItem}`).update({ ...data }).then(res => {
				onClose()
				setInputs({
					title: "",
					price: "",
					description: ""
				})
				setSnackData({
					isOPen: true,
					snackbarMessage: 'Video Updated  Succesfully',
					severity: 'success'
				})
				setIsOpenSnackBar(true)
			}).catch((err) => {
				alert(err)
				onClose()
				setSnackData({
					isOPen: true,
					snackbarMessage: 'Failed to Update Video',
					severity: 'error'
				})
			}) :
			firebase.database().ref(`videos`).push({
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
					snackbarMessage: 'Video Added Succesfully',
					severity: 'success'
				})
				setIsOpenSnackBar(true)


			}).catch((err) => {
				alert(err)
				onClose()
				setSnackData({
					isOPen: true,
					snackbarMessage: 'Failed to upload video',
					severity: 'error'
				})



			})
	}
	console.log(inputs, "INPUASDASD");
	const data = {
		title: inputs.title,
		price: inputs.price,
		description: inputs.description,
		video: uploadMedia
	}

	return (
		<div style={{ padding: '20px' }} >
			<Snackbar open={isOPenSnackBar} autoHideDuration={4000} onClose={handleSnackClose}  >
				<Alert severity={snackData.severity}>
					{snackData.snackbarMessage}
				</Alert>
			</Snackbar>
			<CustomDialog
				title={isEdit ? 'Edit Video' : 'Add New Video'}
				renderDialogBody={() => renderDialogContent()}
				isOPen={showModal}
				onClose={onClose}
				type="video"
				data={data}
				onSubmit={onSubmit}

			/>
			<div class="row">
				<div class="col-md-6 col-sm-12">
					<FormControl  className={classes.formControl}>
						<InputLabel htmlFor="outlined-age-native-simple">Filter Packages By Users</InputLabel>
						<Select
							fullWidth
							native
							value={state.age}
							onChange={handleSelectChange}
							inputProps={{
								name: 'age',
								id: 'age-native-simple',
							}}
						>
							<option aria-label="None" value="" />
							{
								keys.map((val,ind) => {
									const {name} = ArrayData[val]
									return (
										<option value={ind}>{name}</option>
									)
								})

							}
						</Select>
					</FormControl>



				</div>
			</div>
		</div>
	)

}

export default Video;