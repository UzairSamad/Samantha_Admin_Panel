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
    minHeight: 200,


  },
  media: {
    height: 200,
    maxWidth: 300,
  },
});



export default function MediaCard({ data }) {
  console.log(data, "ADASDASD");
  const classes = useStyles();

  const { packageDetails, videos } = data

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent style={{ minHeight: '200px' }}>
          <Typography
            component="h1"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            Title
          </Typography>
          <Typography component="p" >
            {packageDetails.title}
          </Typography>
          <Typography
            component="h1"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            Description
          </Typography>
          <Typography component="p" >
            {packageDetails.description}
          </Typography>
          <Typography
            component="h1"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            Price
          </Typography>
          <Typography component="p" >
            {`$${packageDetails.price}`}
          </Typography>
          {/* <Typography variant="body2" component="p">
            {data.description}
          </Typography> */}

        </CardContent>
      </CardActionArea>

    </Card>
  );
}
