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



export default function MediaCard({ data,renderkey,handleOPenSnack }) {
  

  const deleteVideo = () => {
    // alert("called")
// firebase.database().ref("")
firebase.database().ref(`videos/${renderkey}`).remove().then((res)=>{
  handleOPenSnack()
})
  }
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="iframe"
          src={data.video}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`description`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" variant="contained" onClick={deleteVideo}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
