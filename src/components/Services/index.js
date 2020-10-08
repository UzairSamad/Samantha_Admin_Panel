import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppPageCarded from '../App/AppPageCarded';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';


const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));




const Services = (props) => {
	const classes = useStyles();
	const [title, setTitle] = React.useState("")
	const [description, setDescription] = React.useState("")
	const [imgURL, setImageUrl] = React.useState("")

	let handleChange = (e) => {
		console.log(e.target.name)
		if (e.target.name === "title") {
			setTitle(e.target.value)

		} else if (e.target.name === "description") {
			setDescription(e.target.value)

		}
	}
	return (
		<div>
			<div style={{ marginTop: '40px', marginLeft: '15px', marginBottom: '26px', fontSize: '25px' }}>Add or Update Service</div>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField size="small" onChange={handleChange} name="title" value={title} id="outlined-basic" label="Title" variant="outlined" />
				<TextField size="small" style={{ width: '40%' }} multiline={true} onChange={handleChange} name="description" value={description} id="outlined-basic" label="Description" variant="outlined" />
				<Input type="file" size="small" name="description" value={description} id="outlined-basic" label="Description" variant="outlined" />
				<Button variant="contained" color="primary">
					Upload Image
				</Button>

			</form>

		</div>


	)

}

export default Services;