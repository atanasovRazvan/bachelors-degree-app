import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Alert from '@material-ui/lab/Alert';
import isAccountValid, {
  isConfirmPasswordValid,
  isEmailValid,
  isNameValid,
  isPasswordValid,
  isUsernameValid,
} from './FieldValidationHelper';
import serverUrl from '../utils/constants';
import config from '../utils/config';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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

const Register = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const initialErrors = {
    firstName: false,
    lastName: false,
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
  };

  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const classes = useStyles();

  const handleRegister = () => {
    if (!isAccountValid(state)) {
      setErrors({
        firstName: !isNameValid(state.firstName),
        lastName: !isNameValid(state.lastName),
        email: !isEmailValid(state.email),
        username: !isUsernameValid(state.username),
        password: !isPasswordValid(state.password),
        confirmPassword: !isConfirmPasswordValid(state.password, state.confirmPassword),
      });
    } else {
      axios.put(`${serverUrl}/user`, state, config)
        .then(() => {
          setRedirectToLogin(true);
        })
        .catch(() => {
          setRegisterError(
            <Alert severity="warning" className={classes.alert}>
              <AlertTitle>Eroare la inregistrare</AlertTitle>
              Daca sunteti sigur ca datele introduse sunt conforme, cel mai probabil exista o
              problema interna la server. Va rugam sa ne contactati!
            </Alert>,
          );
        });
    }
  };

  return (
    redirectToLogin
      ? <Redirect to="/login" />
      : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Inregistrare
            </Typography>
            {registerError}
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Prenume"
                    autoFocus
                    error={errors.firstName}
                    value={state.firstName}
                    onChange={(event) => setState(
                      { ...state, [event.target.name]: event.target.value },
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Nume"
                    name="lastName"
                    autoComplete="lname"
                    error={errors.lastName}
                    value={state.lastName}
                    onChange={(event) => setState(
                      { ...state, [event.target.name]: event.target.value },
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    error={errors.email}
                    value={state.email}
                    onChange={(event) => setState(
                      { ...state, [event.target.name]: event.target.value },
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="username"
                    label="Nume de utilizator"
                    id="username"
                    autoComplete="username"
                    error={errors.username}
                    value={state.username}
                    onChange={(event) => setState(
                      { ...state, [event.target.name]: event.target.value },
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Parola"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={errors.password}
                    value={state.password}
                    onChange={(event) => setState(
                      { ...state, [event.target.name]: event.target.value },
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirma parola"
                    type="password"
                    id="confirm-password"
                    autoComplete="confirm-password"
                    error={errors.confirmPassword}
                    value={state.confirmPassword}
                    onChange={(event) => setState(
                      { ...state, [event.target.name]: event.target.value },
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="Sunt de acord cu termenii si conditiile"
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => handleRegister()}
              >
                Inregistreaza-te
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Ai deja cont? Conecteaza-te!
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      )
  );
};

export default Register;
