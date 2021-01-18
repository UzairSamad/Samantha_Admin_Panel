import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import OptimizedField from "../App/OptimizedTextField"
import firebase from "firebase"
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CardActions from '@material-ui/core/CardActions';
import axios from "axios"
import CustomDialog from '../App/Dialog'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { app } from '../../database/index'
import TextField from "@material-ui/core/TextField"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactAudioPlayer from 'react-audio-player';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import PDFViewer from 'pdf-viewer-reactjs'
import ReadMoreReact from 'read-more-react';







const useStyles = makeStyles({
    media: {
        height: 200,
    },
    root: {
        maxWidth: 300,
        minHeight: 300
    },
});


const FreeViees = (props) => {
    const classes = useStyles();

    const [data, setData] = React.useState({
        title: '',
        quantity: '',
        description: ''
    })
    const [isOPen, setIsOpen] = React.useState(false)
    const [isEdit, setIsEdit] = React.useState(false)
    const [currentItem, setCurrentItem] = React.useState(null)
    const [isOPenSnackBar, setIsOpenSnackBar] = React.useState(false)
    const [ArrayData, setArrayData] = React.useState([])
    const [loader, setLoader] = React.useState(false)
    const [uploadMedia, setUploadMedia] = React.useState(null)
    const [currentCard, setCurrentCard] = React.useState(null)
    const [inputs, setInputs] = React.useState({
        title: "",
        quantity: "",
        description: ""
    })
    const [snackData, setSnackData] = React.useState({
        isOPen: false,
        snackbarMessage: null,
        severity: null
    })
    const [mediaType, setMediaType] = React.useState('');





    React.useEffect(() => {
        firebase.database().ref("freevies").on("value", snapshot => {
            let data = snapshot.val() ? snapshot.val() : {}
            let Items = { ...data }
            let cardData = Object.values(Items)
            setArrayData(cardData)
        })
    }, [])

    // Display Card with package data
    const renderAudioCad = (cardDataKey, indx) => {
        let id = Object.keys(cardDataKey)[0]
        let cardData = ArrayData[indx][id]

        const hadleDelete = () => {
            firebase.database().ref(`freevies/${cardData.type}/${id}`).remove().then((res) => {
                setSnackData({
                    isOPen: true,
                    snackbarMessage: 'Deleted  Succesfully',
                    severity: 'success'
                })
                setIsOpenSnackBar(true)
            })
        }
        const handleEdit = (e) => {
            const { type } = cardData
            setIsEdit(true)
            setIsOpen(true)
            setCurrentCard({ type, id })
            setCurrentItem(cardDataKey)
            setMediaType(cardData.type)
            setUploadMedia(cardData.fileUrl)
            setInputs({
                title: cardData.title,
                description: cardData.description,
                quantity: cardData.quantity
            })

        }
        return (
            <div class="col-md-4 col-sm-12">
                <Card className={classes.root} fullWidth >
                    <CardContent>
                        {cardData.type === 'audio' ?
                            <CardMedia className={classes.media}>
                                <ReactAudioPlayer
                                    src={cardData.fileUrl}
                                    controls
                                    style={{ width: '250px', height: '41px', marginBottom: '5px', marginRight: '5px' }}
                                />
                            </CardMedia>
                            : cardData.type === 'video' ?
                                <CardMedia
                                    className={classes.media}
                                    component="iframe"
                                    src={cardData.fileUrl}
                                /> :
                                null
                        }
                        <Typography gutterBottom style={{ fontSize: '16px' }} component="h6">
                            {`Title: ${cardData.title}`}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: '16px' }} component="h6">
                            {`Quantity: ${cardData.quantity}`}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: '16px' }} component="h6">
                            {`Description:`}
                        </Typography>
                        {/* <Typography gutterBottom component="h5" style={{ wordBreak: 'break-all' }}>
                            {cardData.description}
                        </Typography> */}
                        <ReadMoreReact min={2} text={cardData.description} />

                        {cardData.type === 'pdf' && <div class="col-md-12 col-sm-12" style={{ marginBottom: '12px', marginTop: "10px" }}>
                            <Button variant="contained" color="secondary" onClick={() => window.open(cardData.fileUrl, "_blank")} > Click here to view file</Button>
                        </div>}
                    </CardContent>
                    <CardActions>
                        <Button size='small' fullWidth variant="contained" color="secondary" onClick={(e) => handleEdit()}>
                            Edit
  					          </Button>
                        <Button size='small' fullWidth variant="contained" color="secondary" onClick={(e) => hadleDelete()}>
                            Delete
  				            </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }


    const onClose = () => {
        setIsOpen(false)
        setIsEdit(false)
        setInputs({
            title: "",
            quantity: "",
            description: ""
        })
        setMediaType(null)
        setUploadMedia(null)
        setLoader(false)
    }

    // custom dialog content 
    const renderDialogContent = () => {
        const inputRef = React.createRef()

        const handleOpenfileselect = () => {
            inputRef.current.click()
        }
        const handleChange = (event) => {
            setMediaType(event.target.value);
        };

        const handleUploadChange = (e) => {
            setLoader(true)
            if (mediaType == 'pdf') {
                const file = e.target.files[0]
                const storageRef = app.storage().ref()
                const fileRef = storageRef.child(file.name)
                fileRef.put(file).then(res => {
                    storageRef.child(file.name).getDownloadURL().then(function (url) {
                        console.log(url, 'docUrldocUrl')
                        setLoader(false)
                        setUploadMedia(url)
                    });
                })

            } else {
                const formData = new FormData()
                formData.append("file", e.target.files[0])
                formData.append("upload_preset", "shp8jses")
                axios.post("https://api.cloudinary.com/v1_1/duqizyqzf/upload", formData)
                    .then((res) => {
                        setUploadMedia(res.data.secure_url)
                        setLoader(false)
                    }).catch((err) => {
                        // alert("something went wrong")
                        setLoader(false)
                        setSnackData({
                            isOPen: true,
                            snackbarMessage: 'Failed to Upload File ',
                            severity: 'error'
                        })
                    })
            }
        }
        const onChange = (e) => {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            })
        }
        return (
            <div class="row">
                <input
                    type="file"
                    id="file"
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={(e) => {
                        handleUploadChange(e)
                    }}
                />
                <div class="col-md-6 col-sm-12" style={{ marginBottom: '12px' }}>
                    <OptimizedField
                        name="title"
                        type="text"
                        placeholder="Title"
                        onChange={onChange}
                        value={inputs.title}
                    />
                </div>
                <div class="col-md-6 col-sm-12" style={{ marginBottom: '12px' }}>

                    <OptimizedField
                        name="quantity"
                        type="text"
                        placeholder="Quantity"
                        label="Quantity"
                        onChange={onChange}
                        value={inputs.quantity}
                    />
                </div>
                <div class="col-md-12 col-sm-12" style={{ marginBottom: '12px' }}>
                    <OptimizedField
                        name="description"
                        type="text"
                        placeholder="Description"
                        onChange={onChange}
                        value={inputs.description}
                    />
                </div>
                <div class="col-md-12 col-sm-12" style={{ marginBottom: '12px' }}>
                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-outlined-label">Select Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={mediaType}
                            onChange={handleChange}
                            label="Type"
                            fullWidth
                        >
                            <MenuItem value={`audio`}>Audio</MenuItem>
                            <MenuItem value={`video`}>Video</MenuItem>
                            <MenuItem value={`pdf`}>Document/PDF</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div class="col-md-12 col-sm-12" style={{ marginBottom: '12px' }}>
                    <TextField
                        size="small"
                        id="filled-basic"
                        variant="filled"
                        className="text-box"
                        placeholder={`File URL`}
                        margin="normal"
                        value={uploadMedia == null ? "" : uploadMedia}
                        className="textbox-def"
                        disabled
                    />
                </div>
                { uploadMedia &&
                    <div class="col-md-12 col-sm-12" style={{ marginBottom: '12px' }}>
                        <Button variant="contained" color="secondary" onClick={() => window.open(uploadMedia, "_blank")} > Click here to view file</Button>
                    </div>}
                <div class="col-md-4 col-sm-12" style={{ marginBottom: '12px' }}>
                    {loader ? <CircularProgress /> :
                        uploadMedia != null ?
                            <Button style={{ height: '41px', marginTop: '17px' }} variant="contained" fullWidth color="secondary" onClick={() => setUploadMedia(null)}>
                                Remove File
  							</Button>
                            :
                            <Button onClick={() => handleOpenfileselect()} style={{ height: '41px', marginTop: '17px' }} variant="contained" fullWidth color="secondary">
                                Upload File
						  </Button>
                    }
                </div>
            </div>
        )
    }
    const handleSnackClose = (event, reason,) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpenSnackBar(false)
    }
    const onSubmit = () => {
        const newData = {
            title: inputs.title,
            quantity: inputs.quantity,
            description: inputs.description,
            type: mediaType,
            fileUrl: uploadMedia
        }
        console.log(currentCard, 'currentCardcurrentCard')
        isEdit ?
            firebase.database().ref(`freevies/${currentCard.type}/${currentCard.id}`).update({ ...newData }).then(res => {
                onClose()
                setInputs({
                    title: "",
                    quantity: "",
                    description: ""
                })
                setSnackData({
                    isOPen: true,
                    snackbarMessage: ' Updated  Succesfully',
                    severity: 'success'
                })
                setIsOpenSnackBar(true)
            }).catch((err) => {
                onClose()
                setSnackData({
                    isOPen: true,
                    snackbarMessage: 'Failed to Update ',
                    severity: 'error'
                })
            })
            :
            firebase.database().ref(`freevies/${mediaType}`).push({
                ...newData
            }).then((res) => {
                onClose()
                setInputs({
                    title: "",
                    quantity: "",
                    description: ""
                })
                setSnackData({
                    isOPen: true,
                    snackbarMessage: 'Package Created  Succesfully',
                    severity: 'success'
                })
                setIsOpenSnackBar(true)

            }).catch((err) => {
                alert(err)
                onClose()
                setSnackData({
                    isOPen: true,
                    snackbarMessage: 'Failed to upload video',
                    severity: 'error'
                })
            })
    }
    return (
        <div style={{ padding: '20px' }}>
            <Snackbar open={isOPenSnackBar} autoHideDuration={4000} onClose={handleSnackClose}  >
                <Alert severity={snackData.severity}>
                    {snackData.snackbarMessage}
                </Alert>
            </Snackbar>
            <CustomDialog
                title={isEdit ? 'Edit ' : 'Create '}
                renderDialogBody={() => renderDialogContent()}
                isOPen={isOPen}
                onClose={onClose}
                type="video"
                data={data}
                onSubmit={onSubmit}
            />
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Button style={{ marginTop: '5px', marginBottom: '5px' }} variant="contained" color="secondary" onClick={() => setIsOpen(true)} >
                    Create
  				  </Button>
            </div>
            <div class="row">
                {
                    ArrayData.map((val, ind) => {
                        return (
                            <>
                                {renderAudioCad(val, ind)}
                            </>
                        )
                    })
                }
            </div>
        </div>


    )

}

export default FreeViees;