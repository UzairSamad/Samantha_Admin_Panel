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
import axios from "axios"
import CustomDialog from '../App/Dialog'
import CardActions from '@material-ui/core/CardActions';







const VideoPackage = (props) => {
    const [data, setData] = React.useState({
        title: '',
        price: '',
        description: ''
    })
    const [isOPen, setIsOpen] = React.useState(false)
    const [isEdit, setIsEdit] = React.useState(false)
    const [currentItem, setCurrentItem] = React.useState(null)
    const [isOPenSnackBar, setIsOpenSnackBar] = React.useState(false)
    const [ArrayData, setArrayData] = React.useState([])
    const [loader, setLoader] = React.useState(false)
    const [inputs, setInputs] = React.useState({
        title: "",
        price: "",
        description: ""
    })
    const [snackData, setSnackData] = React.useState({
        isOPen: false,
        snackbarMessage: null,
        severity: null
    })

    React.useEffect(() => {
        firebase.database().ref("video-packages").on("value", snapshot => {
            let data = snapshot.val() ? snapshot.val() : {}
            let Items = { ...data }
            setArrayData(Items)
            console.log(Items, 'ItemsItems')
        })
    }, [])
    const keys = Object.keys(ArrayData)

    // Display Card with package data
    const renderPackageCard = (cardDataKey) => {
        let cardData = ArrayData[cardDataKey]
        const hadleDelete = () => {
            firebase.database().ref(`video-packages/${cardDataKey}`).remove().then((res) => {
                setSnackData({
                    isOPen: true,
                    snackbarMessage: 'Package Deleted  Succesfully',
                    severity: 'success'
                })
                setIsOpenSnackBar(true)
            })
        }
        const handleEdit = (e) => {
            setIsEdit(true)
            setIsOpen(true)
            setCurrentItem(cardDataKey)
            setInputs({
                title: cardData.title,
                description: cardData.description,
                price: cardData.price
            })
        }
        console.log('carddd', cardData)
        return (
            <div class="col-md-4 col-sm-12" style={{ maxWidth: 350, maxHeight: 400, padding: '10px' }}>
                <Card  >
                    <CardContent>
                        <Typography gutterBottom style={{ fontSize: '16px', fontWeight: 'bold' }} component="h6">
                            {`Title: ${cardData.title}`}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: '16px', fontWeight: 'bold' }} component="h6">
                            {`Price: ${cardData.price} `}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: '16px', fontWeight: 'bold' }} component="h6">
                            {`Description:`}
                        </Typography>
                        <Typography gutterBottom component="h5" style={{ wordBreak: 'break-all' }}>
                            {cardData.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size='small' fullWidth variant="contained" color="secondary" onClick={(e) => handleEdit(e)}>
                            Edit
  					          </Button>
                        <Button size='small' fullWidth variant="contained" color="secondary" onClick={() => hadleDelete()}>
                            Delete
  				            </Button>
                    </ CardActions>

                </Card>
            </div>
        )
    }


    const onClose = () => {
        setIsOpen(false)
        setIsEdit(false)
        setInputs({
            title: "",
            price: "",
            description: ""
        })
        setLoader(false)
    }

    // custom dialog content 
    const renderDialogContent = () => {
        const onChange = (e) => {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            })
        }
        return (
            <div class="row">
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
                        name="price"
                        type="text"
                        placeholder="Price"
                        label="Price"
                        onChange={onChange}
                        value={inputs.price}
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
            price: inputs.price,
            description: inputs.description,
        }

        isEdit ?
            firebase.database().ref(`video-packages/${currentItem}`).update({ ...newData }).then(res => {
                onClose()
                setInputs({
                    title: "",
                    price: "",
                    description: ""
                })
                setSnackData({
                    isOPen: true,
                    snackbarMessage: 'Package Updated  Succesfully',
                    severity: 'success'
                })
                setIsOpenSnackBar(true)
            }).catch((err) => {
                alert(err)
                onClose()
                setSnackData({
                    isOPen: true,
                    snackbarMessage: 'Failed to Update Package',
                    severity: 'error'
                })
            })
            :
            firebase.database().ref(`video-packages`).push({
                ...newData
            }).then((res) => {
                onClose()
                setInputs({
                    title: "",
                    price: "",
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
                title={isEdit ? 'Edit Package' : 'Create Package'}
                renderDialogBody={() => renderDialogContent()}
                isOPen={isOPen}
                onClose={onClose}
                type="video"
                data={data}
                onSubmit={onSubmit}
            />
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Button style={{ marginTop: '5px', marginBottom: '5px' }} variant="contained" color="secondary" onClick={() => setIsOpen(true)} >
                    Create Package
  				  </Button>
            </div>
            <div class="row">
                {
                    keys.map(val => {
                        return (
                            <>
                                {renderPackageCard(val)}
                            </>
                        )
                    })
                }
            </div>
        </div>


    )

}

export default VideoPackage;