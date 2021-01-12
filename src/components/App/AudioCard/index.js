import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import firebase from "firebase"
import fire from "../../../database"

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    marginBottom: "10px",
    marginTop: "10px"

  },
  media: {
    height: 200,
    maxWidth: 300,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const deleteVideo = () => {
    // alert("called")
    // firebase.database().ref("")
    firebase.database().ref(`audio/${props.renderkey}`).remove().then((res) => {
      props.handleOPenSnack()
    })
  }
  const handleEditVideo = () => {
    props.editVideo()
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        {props.children}
        <Typography  style={{fontWeight:'bold'}}component="h2">
          {`Title: ${props.data.title}`}
        </Typography>
        <Typography variant="body2" style={{fontWeight:'bold'}}component="p">
          {`Price: ${props.data.price}`}
        </Typography>
        <Typography variant="body2" style={{fontWeight:'bold'}}component="p">
          {`Description:`}
        </Typography>
        <Typography variant="body2"  component="p">
          {props.data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"  fullWidth color="primary" variant="contained" onClick={handleEditVideo}>
          Edit
        </Button>
        <Button size="small" fullWidth color="primary" variant="contained" onClick={() => { deleteVideo() }}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
