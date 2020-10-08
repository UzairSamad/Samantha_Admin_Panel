import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import firebaseconfig from '../../database'
import firebase from 'firebase'


function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 500,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		display: 'flex'
	},
	rootfortext: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '80ch',
		},
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
}));



export default function DashBoard() {
	const classes = useStyles();
	const [title, setTitle] = useState('')
	const [subtitle, setSubTitle] = useState('')
	const [open, setOpen] = React.useState(false);
	const [yourmessage, setYourMessage] = useState('')
	const [type, setType] = useState('')




	const handleClose = (event, reason) => {

		setOpen(false);
	};

	const handleSubmit = () => {
		try {
			firebase.database().ref('HomeText').set({
				title,
				subtitle
			}).then(result => {
				setYourMessage("Submitted Successfully")
				setType("success")
				setOpen(true)
			}).catch(err => {
				alert(err.message)
			})
		} catch (error) {
			console.log(error.message);
		}


	}
	console.log(title, subtitle, yourmessage);
	return (
		<Card className={classes.root}>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={type}>
					{yourmessage}
				</Alert>
			</Snackbar>

			<form className={classes.rootfortext}>

				<div style={{ display: 'flex', flex: 1 }}>
					<h1>Title Text</h1>
					<TextField
						label="Enter Main Text"
						type="text"
						variant="outlined"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>
				<div style={{ display: 'flex', flex: 1 }}>
					<h1>SubTitle Text</h1>

					<TextField
						label="Enter Sub Text"
						type="text"
						variant="outlined"
						value={subtitle}
						onChange={e => setSubTitle(e.target.value)}
					/>
				</div>
				<div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
					<Button variant="contained" color="primary" onClick={handleSubmit}>
						Submit
      </Button>
				</div>
			</form>
		</Card>
	);
}
