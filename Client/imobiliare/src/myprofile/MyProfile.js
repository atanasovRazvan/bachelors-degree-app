import React, { useContext, useEffect, useState } from 'react';
import {
  InputLabel, Input, Card, Avatar, Button, Typography, makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import formatDate from '../utils/DateFormatting';
import ChangePasswordModal from './ChangePasswordModal';
import serverUrl from '../utils/constants';
import { AuthContext } from '../context/AuthContext';
import config from '../utils/config';
import convertBase64 from '../utils/base64';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 64px)',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minWidth: '300px',
    maxWidth: '400px',
  },
  avatar: {
    height: '150px',
    width: '150px',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  creationDate: {
    alignSelf: 'flex-end',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  input: {
    width: '300px',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  hidden: {
    display: 'none',
  },
  spaced: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

const MyProfile = () => {
  const classes = useStyles();
  const { token, userInfo, updateUserInfo } = useContext(AuthContext);
  const initialUser = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    avatarSrc: '',
    password: '',
    createdAt: '',
  };

  const [userDetails, setUserDetails] = useState(initialUser);
  const [isEditable, setIsEditable] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const fields = ['lastName', 'firstName', 'email', 'phoneNumber'];
  const labels = ['Nume', 'Prenume', 'Email', 'Numar de telefon'];

  useEffect(() => {
    axios.get(`${serverUrl}/user/${token}`, config)
      .then((res) => {
        setUserDetails(res.data);
      });
  }, []);

  const updateAvatar = async (base64image) => {
    setUserDetails({ ...userDetails, avatarSrc: base64image });
    axios.post(`${serverUrl}/user/setavatar/${userDetails.username}`, base64image, config)
      .then((res) => {
        if (res.status === 200) {
          updateUserInfo({ ...userInfo, avatarSrc: base64image }, true);
        }
      });
  };

  const updateUser = () => {
    axios.post(`${serverUrl}/user`, userDetails, config)
      .then((res) => {
        updateUserInfo(res.data);
      });
  };

  return (
    <div
      className={classes.root}
    >
      <ChangePasswordModal
        onCloseModal={() => setOpenPasswordModal(false)}
        open={openPasswordModal}
        userInfo={userDetails}
      />
      <Card
        className={classes.card}
      >
        <Avatar
          className={classes.avatar}
          src={userDetails?.avatarSrc}
        />

        <input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          className={classes.hidden}
          onChange={async (event) => updateAvatar(await convertBase64(event.target.files[0]))}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="contained-button-file">
          <Button
            color="secondary"
            size="small"
            variant="contained"
            component="span"
          >
            Schimba poza de profil
          </Button>
        </label>

        <Typography
          variant="body2"
          component="p"
          className={classes.creationDate}
        >
          {`Membru din ${formatDate(userDetails?.createdAt)}`}
        </Typography>
      </Card>

      <Card
        className={classes.card}
      >
        {fields.map((field, index) => (
          <div
            key={field}
            className={classes.input}
          >
            <InputLabel
              htmlFor={field}
            >
              {`${labels[index]}:`}
            </InputLabel>
            <Input
              type="text"
              value={userDetails ? userDetails[field] : ''}
              id={field}
              name={field}
              fullWidth
              disableUnderline={!isEditable}
              readOnly={!isEditable}
              onChange={(event) => setUserDetails({
                ...userDetails,
                [event.target.name]: event.target.value,
              })}
            />
          </div>
        ))}

        <div>
          <Button
            className={classes.spaced}
            variant="contained"
            size="small"
            onClick={() => {
              if (isEditable) {
                updateUser();
                setIsEditable(false);
              } else {
                setIsEditable(true);
              }
            }}
            color="secondary"
          >
            {isEditable
              ? 'Salveaza'
              : 'Modifica'}
          </Button>

          <Button
            className={classes.spaced}
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => setOpenPasswordModal(true)}
          >
            Schimba parola
          </Button>
        </div>

      </Card>

    </div>
  );
};

export default MyProfile;
