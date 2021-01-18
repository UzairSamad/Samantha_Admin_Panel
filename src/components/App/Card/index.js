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
import ReadMoreReact from 'read-more-react';



const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    marginBottom: "10px",
    marginTop: "10px",
    minHeight:450

  },
  media: {
    height: 200,
    maxWidth: 300,
  },
});



export default function MediaCard({ data,renderkey,handleOPenSnack ,editVideo}) {
  

  const deleteVideo = () => {
    // alert("called")
// firebase.database().ref("")
firebase.database().ref(`videos/${renderkey}`).remove().then((res)=>{
  handleOPenSnack()
})
  }

  const handleEditVideo =() => {
    editVideo()
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
        <CardContent style={{minHeight:'200px'}}>
          <Typography   component="p">
            {`Title : ${data.title}`}
          </Typography>
          <Typography variant="body2"  component="p">
            {`Price: ${data.price}`}
          </Typography>
          <Typography variant="body2" component="p">
            {`Description:`}
          </Typography>
          {/* <Typography variant="body2" component="p">
            {data.description}
          </Typography> */}
          <ReadMoreReact   min={3} text={data.description} />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" fullWidth color="primary" variant="contained" onClick={handleEditVideo}>
          Edit
        </Button>
        <Button size="small"  fullWidth color="primary" variant="contained" onClick={deleteVideo}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
