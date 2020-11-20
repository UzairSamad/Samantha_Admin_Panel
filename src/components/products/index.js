import React, { useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import firebaseconfig from '../../database'
import firebase from 'firebase'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;

}


const Product = (props) => {

	useEffect(() => {
		alert("rerender")
	}, [image])

	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [image, setImage] = useState([])
	const [error, setError] = useState("")
	const [count, setCount] = useState(0)
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = React.useState(false);
	const [yourmessage, setYourMessage] = React.useState('')
	const [type, setType] = React.useState('')
	const handleUploadCoverImage = async (e) => {
		setLoading(true)
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
		console.log(file, "FILEEE");
		if (file.error) {
			setError(file.error.message)
		}
		setImage([...image, file.secure_url])
		setCount(count + 1)
		setLoading(false)

	}

	const handleClose = (event, reason) => {

		setOpen(false);
	};

	console.log(image, "image");

	const handleDelete = (index) => {
		const list = image
		list.splice(index, 1)
		setImage([...image])
		console.log(image,"IMAGE AFTER CLEANup");

	}

	const handleSubmit = () => {
		firebase.database().ref("Products").push({
			name, description, image
		}).then(result => {
			setYourMessage("Submitted Successfully")
			setType("success")
			setOpen(true)
			setImage([])
			setName("")
			setDescription("")
		}).catch(err => {
			alert(err.message)
		})
	}

	return (
		<>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={type}>
					{yourmessage}
				</Alert>
			</Snackbar>
			<div>
				<h2 className="text-center">
					Add Product Here
			</h2>
				<div style={{ display: 'flex', marginTop: "5%", justifyContent: 'space-around' }}>

					<TextField
						size="small"
						multiline={true}
						style={{ width: '30%' }}
						onChange={(e) => setName(e.target.value)}
						name="name"
						value={name}
						id="outlined-basic"
						label="Name Of Product"
						variant="outlined"
					/>
					<TextField
						size="small"
						style={{ width: '30%' }}
						multiline={true}
						onChange={(e) => setDescription(e.target.value)}
						name="description"
						value={description}
						rows={20}
						id="outlined-basic"
						label="Complete Description"
						variant="outlined"
					/>
					<h2>Total Uploaded Images {count}</h2>
				</div>
				<Button style={{ marginLeft: "5%" }} onClick={handleSubmit} color="primary" variant="contained" >
					Submit Details
				</Button>
				<div style={{ display: 'flex', marginTop: "10%", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<h1>Upload Project Cover Image</h1>
					<Input
						type="file"
						name="file"
						placeholder="Upload Image"
						onChange={handleUploadCoverImage}

					/>
				</div>

				{
					image && image.map((data, index) => {
						return (
							<div style={{ display: 'flex' }}>
								<img
									src={data}
									style={{ height: "20%", width: "23%" }}
								/>
								<Button color="primary" onClick={() => handleDelete(index)}>
									Delete
							</Button>
							</div>
						)
					})
				}
			</div>
		</>

	);
}

export default Product;