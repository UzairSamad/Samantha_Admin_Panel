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



const AddServiceForm = () => {
    const classes = useStyles();
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [image, setImage] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")
    const [value, setValue] = React.useState(2);

    const handleChange = (e) => {
        console.log(e.target.name)
        if (e.target.name === "title") {
            setTitle(e.target.value)

        } else if (e.target.name === "description") {
            setDescription(e.target.value)
        }
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
        let data = { title, description, image }
        console.log(data, 'imageimage');
    }


    return (
        <div>

            <div style={{ marginTop: '40px', marginLeft: '15px', marginBottom: '26px', fontSize: '25px' }}>Add or Update Service</div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField size="small" onChange={handleChange} name="title" value={title} id="outlined-basic" label="Title" variant="outlined" />
                <TextField size="small" style={{ width: '40%' }} multiline={true} onChange={handleChange} name="description" value={description} id="outlined-basic" label="Description" variant="outlined" />
                <Input
                    type="file"
                    name="file"
                    placeholder="Upload Image"
                    onChange={handleUpload}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading} >
                    Add Service
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

export default AddServiceForm