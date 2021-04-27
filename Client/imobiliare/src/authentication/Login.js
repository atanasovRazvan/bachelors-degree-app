import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { Redirect } from 'react-router-dom';
import config from '../utils/config';
import { AuthContext } from '../context/AuthContext';
import serverUrl from '../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(http://source.unsplash.com/collection/3505899)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
            theme.palette.type === 'light'
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setLoginState] = useState(null);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);
  const [remember, setRemember] = useState(false);
  const { updateToken, updateUserInfo } = useContext(AuthContext);

  const handleLogin = () => {
    axios.post(`${serverUrl}/login`, { username, password }, config)
      .then((res) => {
        if (res.status === 200) {
          setLoginState(true);
          updateUserInfo(res.data, remember);
        } else {
          setLoginState(false);
        }
      });
  };

  useEffect(() => {
    if (loginState === true) {
      updateToken(username, remember);
      setRedirectAfterLogin(true);
    }
  }, [loginState]);

  return (
    redirectAfterLogin
      ? <Redirect to="/" />
      : (
        <Grid container component="main" className={classes.root}>

          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Conectare
              </Typography>
              <form className={classes.form}>

                {loginState === false
                  ? (
                    <Alert severity="warning" className={classes.alert}>
                      <AlertTitle>Ati introdus datele gresit</AlertTitle>
                      Numele de utilizator sau parola sunt gresite!
                    </Alert>
                  )
                  : null}

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Nume de utilizator"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  error={loginState === false}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Parola"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={loginState === false}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Tine-ma minte"
                  onChange={() => setRemember((prevState) => !prevState)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => handleLogin()}
                >
                  Conecteaza-te
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/TODO" variant="body2">
                      Ai uitat parola?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      Nu ai cont? Inregistreaza-te!
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      )
  );
};

export default Login;
