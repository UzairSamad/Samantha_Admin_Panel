import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase'
import firebaseconfig from '../../database'
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    root: {
        minWidth: 200,

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
        color: 'black',

    },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;

}
export default function CardComponent(props) {

    const classes = useStyles();
    const {
        androidlink,
        companyName,
        coverImage,
        description,
        ioslink,
        seondaryImage1,
        seondaryImage2,
        seondaryImage3,
        title,
        uilink,
        weblink
    } = props.data

    console.log(props, "Props");

    const handleClickOpen = () => {
        setOpen(!open);
    };
    const handleClose = () => {
        setopenSnack(false);
    };

    const [Title, setTItle] = React.useState(title)
    const [name, setName] = React.useState(companyName)
    const [Description, setDescription] = React.useState(description)
    const [secImage1, setsecImage1] = React.useState(seondaryImage1)
    const [secImage2, setsecImage2] = React.useState(seondaryImage2)
    const [secImage3, setsecImage3] = React.useState(seondaryImage3)

    const [ANDROIDLINK, setANDROIDLINK] = React.useState(androidlink)
    const [IOSLINK, setIOSLINK] = React.useState(ioslink)
    const [UILINK, setUILINK] = React.useState(uilink)
    const [WEBLINK, setWEBLINK] = React.useState(weblink)

    const [Image, setImage] = React.useState(coverImage)
    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [openSnack, setopenSnack] = React.useState(false);
    const [yourmessage, setYourMessage] = React.useState('')
    const [type, setType] = React.useState('')

    const handleChange = (e) => {
        console.log(e.target.name)
        if (e.target.name === "name") {
            setName(e.target.value)

        } else if (e.target.name === "description") {
            setDescription(e.target.value)

        } else if (e.target.name === "ANDROIDLINK") {
            setANDROIDLINK(e.target.value)

        } else if (e.target.name === "IOSLINK") {
            setIOSLINK(e.target.value)

        } else if (e.target.name === "UILINK") {
            setUILINK(e.target.value)

        } else if (e.target.name === "WEBLINK") {
            setWEBLINK(e.target.value)
        }
        else if (e.target.name === "Title") {
            setTItle(e.target.value)
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
            setYourMessage(file.error.message)
            setType("error")
            setopenSnack(true)
        }
        console.log(file, "File");
        setImage(file.secure_url)
        setLoading(false)
        setOpen(false)
        setYourMessage("Image Upadate Successfully")
        setType("success")
        setopenSnack(true)
    }

    const handleSubmit = () => {

        firebase.database().ref(`Portfolio/${props.activekey}`).update({
            androidlink: ANDROIDLINK,
            companyName: name,
            coverImage: Image,
            description: Description,
            ioslink: IOSLINK,
            uilink: UILINK,
            weblink: WEBLINK,
            title: Title,

        }).then(result => {
            setDescription("")

            setImage('')

            setYourMessage("Updated Successfully")
            setType("success")
            setOpen(false)
            setopenSnack(true)

        }).catch(error => {
            alert(error.message)
        })
    }

    return (
        <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type}>
                    {yourmessage}
                </Alert>
            </Snackbar>

            <Dialog
                open={open}

                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>{"Update Content"}</DialogTitle>
                <DialogContent>
                    <TextField size="small" onChange={handleChange} style={{ width: '100%', margin: '2%' }} multiline={true} name="Title" value={Title} label="Title" variant="outlined" />

                    <TextField size="small" onChange={handleChange} style={{ width: '100%', margin: '2%' }} multiline={true} name="name" value={name} label="name" variant="outlined" />
                    <TextField size="small" onChange={handleChange} style={{ width: '100%', margin: '2%' }} multiline={true} name="description" value={Description} label="Description" variant="outlined" />
                    <TextField size="small" onChange={handleChange} style={{ width: '100%', margin: '2%' }} multiline={true} name="ANDROIDLINK" value={ANDROIDLINK} label="ANDROID LINK" variant="outlined" />
                    <TextField size="small" onChange={handleChange} style={{ width: '100%', margin: '2%' }} multiline={true} name="IOSLINK" value={IOSLINK} label="IOS LINK" variant="outlined" />
                    <TextField size="small" onChange={handleChange} style={{ width: '100%', margin: '2%' }} multiline={true} name="WEBLINK" value={WEBLINK} label="WEB LINK" variant="outlined" />
                    <TextField size="small" onChange={handleChange} style={{ width: '100%', margin: '2%' }} multiline={true} name="UILINK" value={UILINK} label="UI LINK" variant="outlined" />
                </DialogContent>
                <DialogActions>
                    {loading ? <h2>Please Wait...</h2> : null}
                    {error != "" ? <h1><strong>{error}</strong></h1> : null}

                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
          </Button>
                    <Button onClick={handleClickOpen} variant="contained" color="primary" autoFocus>
                        Cancel
          </Button>
                </DialogActions>
            </Dialog>

            <Card className={classes.root} variant="outlined" style={{ width: '100%', marginLeft: '2%', marginRight: "2%", marginTop: '4%' }}>
                <CardContent>
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>

                            <strong>Title:</strong> <strong>{Title}</strong>
                        </Typography>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>

                            <strong>Company Name: </strong><strong>{name}</strong>
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>
                            Update Content
                    </Button>
                    </div>
                    <Typography variant="body2" component="p">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary">
                        <a target="_blank" href={Image} style={{ color: 'white' }}>Preview Main Image</a>
                    </Button>
                    <Button variant="contained" color="primary">
                        <a target="_blank" href={secImage1} style={{ color: 'white' }}>Preview Sec 1</a>
                    </Button>
                    <Button variant="contained" color="primary">
                        <a target="_blank" href={secImage2} style={{ color: 'white' }}>Preview Sec 2</a>
                    </Button>
                    <Button variant="contained" color="primary">
                        <a target="_blank" href={secImage3} style={{ color: 'white' }}>Preview Sec 3</a>
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
