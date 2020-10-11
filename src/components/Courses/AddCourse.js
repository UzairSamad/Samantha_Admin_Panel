import React, { Component,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppPageCarded from '../App/AppPageCarded';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import firebaseconfig from '../../database'
import firebase from 'firebase'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;

}

const AddCourses = (props) => {
	const classes = useStyles();
	const [title, setTitle] = React.useState("")
	const [duration, setDuration] = React.useState("")
	const [para2, setPara2] = React.useState("")
	const [error, setError] = React.useState("")
	const [para3, setPara3] = React.useState("")
	const [fees, setFees] = React.useState("")
	const [first, setFirst] = React.useState("")
	const [second, setSecond] = React.useState("")
	const [third, setThird] = React.useState("")
	const [description, setDescription] = React.useState("")
	const [image, setImage] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const [open, setOpen] = React.useState(false);
	const [yourmessage, setYourMessage] = useState('')
	const [type, setType] = useState('')

	let handleChange = (e) => {
		console.log(e.target.name)
		if (e.target.name === "title") {
			setTitle(e.target.value)

		} else if (e.target.name === "description") {
			setDescription(e.target.value)

		}
		else if (e.target.name === "duration") {
			setDuration(e.target.value)

		} else if (e.target.name === "fees") {
			setFees(e.target.value)


		} else if (e.target.name === "first") {
			setFirst(e.target.value)


		} else if (e.target.name === "second") {
			setSecond(e.target.value)


		} else if (e.target.name === "third") {
			setThird(e.target.value)


		} else if (e.target.name === "para2") {
			setPara2(e.target.value)


		} else if (e.target.name === "para3") {
			setPara3(e.target.value)

		}
	}
	const handleClose = (event, reason) => {

		setOpen(false);
	};

	const handleUpload = async (e) => {
		setImage('')
		setError('')
		const files = e.target.files
		const data = new FormData()
		data.append('file', files[0])
		data.append("upload_preset", "srtech")
		setLoading(true)
		const res = await fetch("https://api.cloudinary.com/v1_1/dpa4vcqwe/image/upload", {
			method: 'POST',
			body: data
		})
		const file = await res.json()

		if (file.error) {
			setError(file.error.message)
		}
		setImage(file.secure_url)
		setLoading(false)
	}
	const ClearEveryting = () => {
		setTitle('')
		setDuration('')
		setDescription('')
		setPara2('')
		setPara3('')
		setFirst('')
		setSecond('')
		setThird('')
		setImage('')
		setLoading(false)
	}
	const handleSubmit = () => {
		if (image.length === 0) {
			alert("Please Upload Image")

		}
		else {
			try {
				firebase.database().ref('Courses').push({
					title,
					duration,
					description,
					fees,
					image,
					first,
					second,
					third,
					para2,
					para3
				}).then(result => {
					setYourMessage("Submitted Successfully")
					setType("success")
					setOpen(true)
					ClearEveryting()
				}).catch(err => {
					alert(err.message)
				})
			} catch (error) {
				console.log(error.message);
			}

		}
	}

	return (
		<div>
			<div style={{ marginTop: '40px', marginLeft: '15px', marginBottom: '26px', fontSize: '25px' }}>Add Courses</div>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={type}>
					{yourmessage}
				</Alert>
			</Snackbar>

			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					size="small"
					onChange={handleChange}
					name="title"
					value={title}
					style={{ width: '40%' }}
					label="Title"
					variant="outlined"
				/>
				<TextField
					size="small"
					style={{ width: '40%' }}
					multiline={true}
					onChange={handleChange}
					name="duration"
					value={duration}
					label="Duration"
					variant="outlined"
				/>
				<TextField
					size="small"
					style={{ width: '40%' }}
					multiline={true}
					onChange={handleChange}
					name="fees"
					value={fees}
					label="Fees"
					variant="outlined"
				/>
				<TextField
					size="small"
					style={{ width: '40%' }}
					multiline={true}
					onChange={handleChange}
					name="description"
					value={description}
					label="Description"
					variant="outlined"
				/>
				<TextField
					size="small"
					style={{ width: '30%' }}
					multiline={true}
					onChange={handleChange}
					name="first"
					value={first}
					label="Name of first App"
					variant="outlined"
				/>
				<TextField
					size="small"
					style={{ width: '30%' }}
					multiline={true}
					onChange={handleChange}
					name="second"
					value={second}
					label="Name of second App"
					variant="outlined"
				/>
				<TextField
					size="small"
					style={{ width: '30%' }}
					multiline={true}
					onChange={handleChange}
					name="third"
					value={third}
					label="Name of Third App"
					variant="outlined"
				/>
				<TextField
					size="small"
					style={{ width: '40%' }}
					multiline={true}
					onChange={handleChange}
					name="para2"
					value={para2}
					label="Detail for para 2"
					variant="outlined"
				/>
				<TextField
					size="small"
					style={{ width: '40%' }}
					multiline={true}
					onChange={handleChange}
					name="para3"
					value={para3}
					label="Detail for para 3"
					variant="outlined"
				/>
				<Input
					type="file"
					name="file"
					placeholder="Upload Image"
					onChange={handleUpload}
				/>
				<Button variant="contained" color="primary" onClick={handleSubmit}>
					Upload Content
				</Button>

			</form>
			<div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				{
					loading ? <h3>Uploading Image Please Wait ...</h3> :

						<img src={image} style={{ width: '300px' }} />


				}
				{error != "" ? <h1><strong>{error}</strong></h1> : null}
			</div>
		</div>


	)

}

export default AddCourses;