import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import firebaseconfig from '../../database'
import firebase from 'firebase'
import SuccesHandler from '../App/Shared/SuccesHelper'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;

}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                SR Digitech
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://www.jenyalestina.com/blog/wp-content/uploads/2019/05/web-development.jpg)',
        backgroundColor: '#e73859',
        backgroundRepeat: 'no-repeat',
        // backgroundColor:
        //     theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '80%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignInSide() {
    const classes = useStyles();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const [yourmessage, setYourMessage] = React.useState('')
    const [type, setType] = React.useState('')

    const handleClose = (event, reason) => {

        setOpen(false);
    };

    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
            if (res) {
                // console.log(res);
                setType("success")
                setYourMessage("Loggedin Succesfully")
                setOpen("true")
                localStorage.setItem('email', res.user.email)
                window.location = '/dashboard'
            }

        }).catch(function (error) {
            console.log(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            setType("error")
            setYourMessage('Invalid email or password')
            setOpen("true")
            // ...
        });


    }

//    const handlefacebooklogin = ()=>{
//     var provider = new firebase.auth.FacebookAuthProvider();
//     provider.addScope('public_profile')
  
//       firebase.auth().signInWithPopup(provider).then(function(result) {
//         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//         console.log(result,"REs");
//         var token = result.credential.accessToken;
//         // The signed-in user info.
//         var user = result.user;
//         // ...
//       }).catch(function(error) {
//           console.log(error,"ERror");
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // The email of the user's account used.
//         var email = error.email;
//         // The firebase.auth.AuthCredential type that was used.
//         var credential = error.credential;
//         // ...
//       });

//     }

    return (
        <Grid container component="main" className={classes.root}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type}>
                    {yourmessage}
                </Alert>
            </Snackbar>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={9} className={classes.image} />
            <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                     </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            size="small"
                            value={email}

                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            size="small"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}


                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            size="small"
                            onClick={handleLogin}

                        >
                            Sign In
                       </Button>
                        {/* <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            size="small"
                            onClick={handlefacebooklogin}

                        >
                            Facebook Login
                       </Button> */}
                        <Grid container>
                            {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                               </Link>
                            </Grid> */}
                            <Grid item>
                                {/* <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link> */}
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            {/* <Copyright /> */}
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
