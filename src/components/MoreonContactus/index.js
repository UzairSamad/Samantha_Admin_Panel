import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 300,
        width: 200,
        marginTop: '2%',
        marginLeft:'2%'
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
    },
});

export default function MoreOnContactUsDetails(props) {
    const classes = useStyles();
    console.log(props, "PROPS");
    const { email, message, name, phone } = props.HistoryItem

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="h5" component="h2">

                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {phone}
                </Typography>
                <Typography variant="body2" component="p">
                    {email}

                </Typography>
                <Typography variant="body2" component="p" style={{marginTop:'2%'}}>
                    {message}
                </Typography>
            </CardContent>

        </Card>
    );
}