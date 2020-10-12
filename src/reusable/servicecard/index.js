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
        title,
        description,
        subdescription,
        enddescription,
        image
    } = props.data



    const handleClickOpen = () => {
        setOpen(!open);
    };
    const handleClose = () => {
        setopenSnack(false);
    };


    const [Title, setTitle] = React.useState(props.data.title)
    const [Description, setDescription] = React.useState(description)
    const [SubDes, setSubdescription] = React.useState(subdescription)
    const [EndDes, setEnddescription] = React.useState(enddescription)
    const [Image, setImage] = React.useState(image)
    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [openSnack, setopenSnack] = React.useState(false);
    const [yourmessage, setYourMessage] = React.useState('')
    const [type, setType] = React.useState('')

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

        firebase.database().ref(`Services/${props.activekey}`).update({
            title: Title, description: Description, subdescription: SubDes, enddescription: EndDes, image: Image
        }).then(result => {
            setDescription("")
            setSubdescription('')
            setEnddescription("")
            setImage('')
            setTitle("")
            setYourMessage("Updated Successfully")
            setType("success")
            setOpen(false)
            setopenSnack(true)

        }).catch(error => {
            alert(error.message)
        })
    }

    console.log(props.data.image,Image,"IMAGESSS");
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
                    <TextField size="small" onChange={handleChange} style={{ width: '100%', margin: '2%' }} multiline={true} name="title" value={Title} label="Title" variant="outlined" />
                    <TextField size="small" onChange={handleChange} style={{ width: '100%', margin: '2%' }} multiline={true} name="description" value={Description} label="Description" variant="outlined" />
                    <TextField size="small" onChange={handleChange} style={{ width: '100%', margin: '2%' }} multiline={true} name="subdescription" value={SubDes} label="Sub Description" variant="outlined" />
                    <TextField size="small" onChange={handleChange} style={{ width: '100%', margin: '2%' }} multiline={true} name="enddescription" value={EndDes} label="End Paragraph" variant="outlined" />
                </DialogContent>
                <DialogActions>
                {loading ? <h2>Please Wait...</h2> : null}
                {error != "" ? <h1><strong>{error}</strong></h1> : null}
                    <input
                        accept="image/*"
                        className={classes.input}
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={handleUpload}
                    />
                    <label htmlFor="raised-button-file">
                        
                        
                        <Button variant="contained" color="primary" component="span" className={classes.button}>
                            Upload Image
                        </Button>

                    </label>
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

                            <strong>{title}</strong>
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>
                            Update Content
                    </Button>
                    </div>
                    <Typography variant="h5" component="h2">

                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        <h3 style={{ marginBottom: '10px' }}><strong>Description</strong></h3> {description}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        <h3 style={{ marginBottom: '10px' }}><strong>Sub Description</strong></h3> {subdescription}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        <h3 style={{ marginBottom: '10px' }}><strong>End Description</strong></h3> {enddescription}
                    </Typography>
                    <Typography variant="body2" component="p">
                        <img />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary">
                        <a target="_blank" href={Image} style={{ color: 'white' }}>Preview Image</a>
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
