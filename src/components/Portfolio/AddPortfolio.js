import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from 'firebase'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import firebaseconfig from '../../database'

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginTop: '-1%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;

}




const AddPortfolio = (props) => {

    // https://play.google.com/store/apps/details?id=com.ihorizon

    const classes = useStyles();
    const [coverImage, setCoverImage] = React.useState([])
    const [seondaryImage1, setSeondaryImage1] = React.useState("")
    const [seondaryImage2, setSeondaryImage2] = React.useState("")
    const [seondaryImage3, setSeondaryImage3] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [companyName, setCompanyName] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")
    const [open, setOpen] = React.useState(false);
    const [yourmessage, setYourMessage] = React.useState('')
    const [type, setType] = React.useState('')
    const [androidlink, setAndroidLink] = React.useState('')
    const [weblink, setWebLink] = React.useState('')
    const [ioslink, setIosLink] = React.useState('')
    const [uilink, setUiLink] = React.useState('')
    const [data, setData] = React.useState('')
    const [gotkeys, setgotKeys] = React.useState('')

    const handleClose = (event, reason) => {

        setOpen(false);
    };

    React.useEffect(function effectFunction() {

        firebase.database().ref('Services').on('value', snapshot => {
            let values = [];
            snapshot.forEach((child) => {
                values.push(child.val())

            })
            setData(values)
        })
    }, []);



    const handleSubmit = (e) => {

        if (coverImage == "") {
            setType("error")
            setYourMessage("Cover Image must be uploaded")
            setOpen("true")
        }
        else {
            firebase.database().ref("Portfolio").push({
                title, description, companyName, coverImage, seondaryImage1, seondaryImage2, seondaryImage3, androidlink, ioslink, weblink, uilink
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
        setTitle("")
        setAndroidLink("")
        setIosLink("")
        setWebLink("")
        setUiLink("")
        setDescription("")
        setCompanyName("")
        setCoverImage("")
        setSeondaryImage1("")
        setSeondaryImage2("")
        setSeondaryImage3("")
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
        else if (e.target.name === "Android Link") {
            setAndroidLink(e.target.value)
        }
        else if (e.target.name === "IOS Link") {
            setIosLink(e.target.value)
        }
        else if (e.target.name === "Web Link") {
            setWebLink(e.target.value)
        }
        else if (e.target.name === "UI/UX Link") {
            setUiLink(e.target.value)
        }
    }
    const handleSelectChange = (event) => {
        setTitle(event.target.value);
        console.log(event.target.value)
    };

    console.log(data, "DATA");
    return (

        <div>

            <div style={{ marginTop: '5%', marginLeft: '3%' }} >
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={type}>
                        {yourmessage}
                    </Alert>
                </Snackbar>
                <form style={{ marginBottom: '2%' }} >
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={title}
                            onChange={handleSelectChange}
                        >
                            {data.length > 0 ? (
                                data.map(key => (
                                    <MenuItem key={key.title} value={key.title}>{key.title}</MenuItem>
                                ))

                            ) : (
                                    <div />
                                )}
                        </Select>
                    </FormControl>
                    <TextField style={{ marginRight: '10px' }} size="small" style={{ width: '33%', marginRight: '1%' }} onChange={handleChange} name="companyName" value={companyName} id="outlined-basic" label="Company Name" variant="outlined" />
       
                        <TextField style={{ marginRight: '10px' }} size="small" style={{ width: '40%' }} multiline={true} onChange={handleChange} name="description" value={description} id="outlined-basic" label="Description" variant="outlined" />

                    <div>
                        <TextField style={{ marginRight: '10px', marginTop: '10px' }} size="small" onChange={handleChange} name="Android Link" value={androidlink} id="outlined-basic" label="Android Link" variant="outlined" />
                    </div>

                    <div>
                        <TextField style={{ marginRight: '10px', marginTop: '10px' }} size="small" onChange={handleChange} name="IOS Link" value={ioslink} id="outlined-basic" label="IOS Link" variant="outlined" />
                    </div>
                    <div>
                        <TextField style={{ marginRight: '10px', marginTop: '10px' }} size="small" onChange={handleChange} name="Web Link" value={weblink} id="outlined-basic" label="Web Link" variant="outlined" />
                    </div>

                    <div>
                        <TextField style={{ marginRight: '10px', marginTop: '10px' }} size="small" onChange={handleChange} name="Ui/UX Link" value={uilink} id="outlined-basic" label="Ui/UX Link" variant="outlined" />
                    </div>
                </form>
                <h3>Upload Project Cover Image</h3>
                <Input
                    type="file"
                    name="file"
                    placeholder="Upload Image"
                    onChange={handleUploadCoverImage}

                />
                <div style={{ flex: 1, justifyContent: 'space-around', display: 'flex' }}>
                    {loading ? <h2 style={{ marginTop: '4%' }}>Uploading Image..Please Wait</h2> : null}
                    {error != "" ? <h1><strong>{error}</strong></h1> : null}
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {

                            <img src={coverImage} style={{ width: '150px' }} />
                        }

                    </div>
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
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {

                            <img src={seondaryImage3} style={{ width: '150px' }} />
                        }

                    </div>
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

                <Input
                    type="file"
                    name="file"
                    placeholder="Upload Image"
                    onChange={handleUploadSecondaryImage2}

                />

                <Input
                    type="file"
                    name="file"
                    placeholder="Upload Image"
                    onChange={handleUploadSecondaryImage3}

                />
                <div>
                    <Button style={{ marginTop: '2%' }} variant="contained" color="primary" onClick={handleSubmit} >
                        Upload Content
				</Button>
                </div>
            </div>


        </div>



    );
}

export default AddPortfolio;