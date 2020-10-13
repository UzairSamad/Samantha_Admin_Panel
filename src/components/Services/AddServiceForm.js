import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppPageCarded from '../App/AppPageCarded';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import firebase from 'firebase'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import firebaseconfig from '../../database'

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


const AddServiceForm = () => {
    const classes = useStyles();
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [subdescription, setSubdescription] = React.useState("")
    const [enddescription, setEnddescription] = React.useState("")
    const [image, setImage] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")
    const [value, setValue] = React.useState(2);
    const [open, setOpen] = React.useState(false);
    const [yourmessage, setYourMessage] = React.useState('')
    const [type, setType] = React.useState('')
    const [seondaryImage1, setSeondaryImage1] = React.useState("")
    const [seondaryImage2, setSeondaryImage2] = React.useState("")

    const handleChange = (e) => {
        console.log(e.target.name)
        if (e.target.name === "title") {
            setTitle(e.target.value)

        } else if (e.target.name === "description") {
            setDescription(e.target.value)

        } else if (e.target.name === "subdescription") {
            setSubdescription(e.target.value)

        } else if (e.target.name === "enddescription") {
            setEnddescription(e.target.value)
        }
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

    const handleSubmit = (e) => {
        let data = { title, description, subdescription, image, enddescription }
        if (image == "") {
            setType("error")
            setYourMessage("Cover Image must be uploaded")
            setOpen("true")
        }
        else {
            firebase.database().ref("Services").push({
                title, description, subdescription, image, enddescription
            }).then(result => {
                setYourMessage("Submitted Successfully")
                setType("success")
                setOpen(true)
                ClearEveryting()
            }).catch(err => {
                alert(err.message)
            })
        }
    }
    const ClearEveryting = () => {
		setTitle('')
        setImage('')
        setDescription("")

        setLoading(false)
        setSubdescription('')
        setEnddescription("")
	}

    const handleClose = (event, reason) => {

        setOpen(false);
    };

    return (
        <div>

            <div style={{ marginTop: '40px', marginLeft: '15px', marginBottom: '26px', fontSize: '25px' }}>Add or Update Service</div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type}>
                    {yourmessage}
                </Alert>
            </Snackbar>
            <form className={classes.root} noValidate autoComplete="off">
                <div >
                    <TextField size="small" onChange={handleChange} name="title" value={title} id="outlined-basic" label="Title" variant="outlined" />
                </div>
                <TextField size="small" style={{ width: '30%' }} multiline={true} onChange={handleChange} name="description" value={description} id="outlined-basic" label="Description" variant="outlined" />
                <TextField size="small" style={{ width: '30%' }} multiline={true} onChange={handleChange} name="subdescription" value={subdescription} id="outlined-basic" label="Sub Description" variant="outlined" />
                <TextField size="small" style={{ width: '30%' }} multiline={true} onChange={handleChange} name="enddescription" value={enddescription} id="outlined-basic" label="End Paragraph" variant="outlined" />
                <h1>Main Image</h1>
                <Input
                    type="file"
                    name="file"
                    placeholder="Update Image"
                    onChange={handleUpload}
                />
                {/* <h1>Inner Image For Andriod/IOS</h1>
                <Input
                    type="file"
                    name="file"
                    placeholder="Upload Image"
                    onChange={handleUploadSecondaryImage1}
                />

                <Input
                    type="file"
                    name="file"
                    placeholder="Upload Image"
                    onChange={handleUploadSecondaryImage2}

                /> */}
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading} >
                    Add Service
            </Button>
            </form>
            {loading ? <h3>Uploading Image Please Wait ...</h3> : null}
            {error != "" ? <h1><strong>{error}</strong></h1> : null}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                   
                        <img src={image} style={{ width: '300px' }} />
                }
                                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {

                            <img src={seondaryImage1} style={{ width: '150px' }} />
                        }

                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {

                            <img src={seondaryImage2} style={{ width: '150px' }} />
                        }

                    </div>
            
            </div>
        </div>

    )
}

export default AddServiceForm