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
import OptimizedField from "../App/OptimizedTextField"
import firebase from "firebase"
import fire from "../../database"

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
	const [ArrayData, setArrayData] = React.useState([])
	const [loader, setLoader] = React.useState(false)
	const [inputs, setInputs] = React.useState({
		title: "",
		price: "",
		description: ""
	})

	React.useEffect(() => {
		firebase.database().ref("videos").on("value", snapshot => {
			let data = snapshot.val() ? snapshot.val() : {}
			let Items = { ...data }
			setArrayData(Items)
		})
	}, [])

	const keys = Object.keys(ArrayData)

	// const [videos, setValue] = React.useState([
	// 	{
	// 		title: 'Video Title Here',
	// 		description: 'Video Description Here',
	// 		url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1'
	// 	},
	// 	{
	// 		title: 'Sample 1',
	// 		description: 'Video Description Here',
	// 		url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
	// 	},
	// 	{
	// 		title: 'Sample 2',
	// 		description: 'Video Description Here',
	// 		url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
	// 	},
	// 	{
	// 		title: 'Sample 2',
	// 		description: 'Video Description Here',
	// 		url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
	// 	},
	// 	{
	// 		title: 'Sample 2',
	// 		description: 'Video Description Here',
	// 		url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
	// 	},
	// 	{
	// 		title: 'Sample 2',
	// 		description: 'Video Description Here',
	// 		url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
	// 	},
	// 	{
	// 		title: 'Sample 2',
	// 		description: 'Video Description Here',
	// 		url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
	// 	},

	// ]);


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
					alert("something went wrong")
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
					{/* <InputLabel style={{ color: 'black' }} >Description</InputLabel> */}
					<OptimizedField
						name="description"
						type="text"
						placeholder="Description"
						onChange={onChange}
						value={inputs.description}
					/>
				</div>
				<div class="col-md-12 col-sm-12" style={{ marginBottom: '12px' }}>
					{uploadMedia &&
						<CardMedia
							className={classes.media}
							component="iframe"
							src={uploadMedia}
							style={{ height: 200 }}
						/>}
				</div>
				<div class="col-md-4 col-sm-12" style={{ marginBottom: '12px' }}>
					{loader ? <CircularProgress /> :
						uploadMedia != null ?
							<Button style={{ height: '41px', marginTop: '17px' }} variant="contained" fullWidth color="secondary" onClick={() => setUploadMedia(null)}>
								Remove Video
  							</Button>
							:
							<Button style={{ height: '41px', marginTop: '17px' }} variant="contained" fullWidth color="secondary" onClick={() => handleOpenfileselect()}>
								Upload Video
  				</Button>

					}
				</div>

			</div>
		)
	}
	const onClose = () => {
		setShowModal(false)
	}
	const onSubmit = () => {
		firebase.database().ref(`videos`).push({
			...data
		}).then((res) => {
			onClose()

		}).catch((err) => {
			alert(err)
			onClose()
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
			<CustomDialog
				title={'Add New Video'}
				renderDialogBody={() => renderDialogContent()}
				isOPen={showModal}
				onClose={onClose}
				type="video"
				data={data}
				onSubmit={onSubmit}

			/>

			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<h2>	All Videos			</h2>
				<Button variant="contained" color="secondary" onClick={() => setShowModal(true)}>
					Upload Video
  				</Button>
			</div>
			<div class="row">
				{
					keys.map(val => {
						// const {} = ArrayData[val]
						return (
							<div class="col-md-4 col-sm-12">
								<MediaCard
									renderkey={val}
									data={ArrayData[val]} />
							</div>
						)
					})
				}

			</div>
		</div>
	)

}

export default Video;