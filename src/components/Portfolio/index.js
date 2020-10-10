import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppPageCarded from '../App/AppPageCarded';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '20%',
		flexDirection: 'column'
	},
}));






const Portfolio = (props) => {
	const classes = useStyles();

	const [coverImage, setCoverImage] = React.useState([])
	const [seondaryImage1, setSeondaryImage1] = React.useState([])
	const [seondaryImage2, setSeondaryImage2] = React.useState([])
	const [seondaryImage3, setSeondaryImage3] = React.useState([])
	const [title, setTitle] = React.useState("")
	const [description, setDescription] = React.useState("")
	const [companyName, setCompanyName] = React.useState("")
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState("")



	const handleSubmit = (e) => {
		let data = { title, description, companyName, coverImage, seondaryImage1, seondaryImage2, seondaryImage3 }
		console.log(data, 'imageimage');
	}


	const handleUploadCoverImage = async (e) => {
		setCoverImage('')
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
		setCoverImage(file.secure_url)
		setLoading(false)

	}
	const handleUploadSecondaryImage1 = async (e) => {
		setSeondaryImage1('')
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
		setSeondaryImage1(file.secure_url)
		setLoading(false)

	}
	const handleUploadSecondaryImage2 = async (e) => {
		setSeondaryImage2('')
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
		setSeondaryImage2(file.secure_url)
		setLoading(false)

	}
	const handleUploadSecondaryImage3 = async (e) => {
		setSeondaryImage3('')
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
		setSeondaryImage3(file.secure_url)
		setLoading(false)

	}
	const handleChange = (e) => {
		console.log(e.target.name)
		if (e.target.name === "title") {
			setTitle(e.target.value)

		} else if (e.target.name === "description") {
			setDescription(e.target.value)
		}
		else if (e.target.name === "companyName") {
			setCompanyName(e.target.value)
		}
	}


	return (
		!loading ?
			<div>

				<div style={{ marginTop: '5%', marginLeft: '3%' }} >
					<form style={{ marginBottom: '2%' }} >
						<TextField style={{ marginRight: '10px' }} size="small" onChange={handleChange} name="title" value={title} id="outlined-basic" label="Title" variant="outlined" />
						<TextField style={{ marginRight: '10px' }} size="small" onChange={handleChange} name="companyName" value={title} id="outlined-basic" label="Company Name" variant="outlined" />
						<TextField style={{ marginRight: '10px' }} size="small" style={{ width: '40%' }} multiline={true} onChange={handleChange} name="description" value={description} id="outlined-basic" label="Description" variant="outlined" />
					</form>
					<h3>Upload Project Cover Image</h3>
					<Input
						type="file"
						name="file"
						placeholder="Upload Image"
						onChange={handleUploadCoverImage}

					/>
					<div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						{
							loading && typeof coverImage === 'string' ? <h3>Uploading Image Please Wait ...</h3> :
								<img src={coverImage} style={{ width: '300px' }} />
						}
						{error != "" ? <h1><strong>{error}</strong></h1> : null}
					</div>
				</div>
				<div style={{ marginTop: '5%', marginLeft: '3%' }}>
					<h3>Upload Project Secondry Images</h3>
					<Input
						type="file"
						name="file"
						placeholder="Upload Image"
						onChange={handleUploadSecondaryImage1}
					/>
					<div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						{
							loading && typeof seondaryImage1 === 'string' ? <h3>Uploading Image Please Wait ...</h3> :
								<img src={seondaryImage1} style={{ width: '300px' }} />
						}
						{error != "" ? <h1><strong>{error}</strong></h1> : null}
					</div>
					<Input
						type="file"
						name="file"
						placeholder="Upload Image"
						onChange={handleUploadSecondaryImage2}

					/>
					<div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						{
							loading && typeof seondaryImage2 === 'string' ? <h3>Uploading Image Please Wait ...</h3> :
								<img src={seondaryImage2} style={{ width: '300px' }} />
						}
						{error != "" ? <h1><strong>{error}</strong></h1> : null}
					</div>
					<Input
						type="file"
						name="file"
						placeholder="Upload Image"
						onChange={handleUploadSecondaryImage3}

					/>
					<div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						{
							loading && typeof seondaryImage3 === 'string' ? <h3>Uploading Image Please Wait ...</h3> :
								<img src={seondaryImage3} style={{ width: '300px' }} />
						}
						{error != "" ? <h1><strong>{error}</strong></h1> : null}
					</div>
					<Button style={{ marginTop: '2%', marginLeft: '80%' }} variant="contained" color="primary" onClick={handleSubmit} disabled={loading} >
						Submit
				</Button>
				</div>


			</div>
			:
			<div className={classes.root}>
				<h2 style={{ marginBottom: '2%' }}>Uploading Image!!!</h2>
				<div>
					<CircularProgress />
				</div>
			</div>


	);
}

export default Portfolio;