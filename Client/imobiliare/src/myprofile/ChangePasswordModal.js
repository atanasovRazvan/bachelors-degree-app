import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import {
  Backdrop, Button, Input, makeStyles,
} from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import InputLabel from '@material-ui/core/InputLabel';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import serverUrl from '../utils/constants';
import config from '../utils/config';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.primary.light,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  field: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },

}));

const ChangePasswordModal = ({ open, onCloseModal, userInfo }) => {
  const classes = useStyles();
  const initialState = {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  };
  const [state, setState] = useState(initialState);
  const fields = ['password', 'newPassword', 'confirmNewPassword'];
  const labels = ['Parola actuala', 'Parola noua', 'Confirma noua parola'];

  const [savingResult, setSavingResult] = useState(null);

  const saveNewPassword = () => {
    if (state.password === userInfo.password) {
      if (state.newPassword === state.confirmNewPassword) {
        axios.post(`${serverUrl}/user/updatePassword/${userInfo.username}`, { oldPassword: state.password, newPassword: state.newPassword }, config)
          .then((res) => {
            if (res.status === 200) {
              setSavingResult(
                <Alert severity="success" className={classes.alert}>
                  <AlertTitle>Parola schimbata!</AlertTitle>
                </Alert>,
              );
            }
          });
      } else {
        setSavingResult(
          <Alert severity="warning" className={classes.alert}>
            <AlertTitle>Confirmarea parolei incorecta</AlertTitle>
          </Alert>,
        );
      }
    } else {
      setSavingResult(
        <Alert severity="warning" className={classes.alert}>
          <AlertTitle>Parola curenta incorecta</AlertTitle>
        </Alert>,
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          {savingResult}
          {fields.map((field, index) => (
            <div
              key={field}
              className={classes.field}
            >
              <InputLabel htmlFor={field}>{labels[index]}</InputLabel>
              <Input
                type="password"
                fullWidth
                id={field}
                value={state[field]}
                onChange={(event) => setState({ ...state, [field]: event.target.value })}
              />
            </div>
          ))}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => saveNewPassword()}
          >
            Salveaza
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

ChangePasswordModal.propTypes = {
  userInfo: PropTypes.instanceOf(Object),
  open: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

ChangePasswordModal.defaultProps = {
  userInfo: null,
};

export default ChangePasswordModal;
