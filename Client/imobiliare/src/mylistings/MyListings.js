import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { AddBoxOutlined } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import serverUrl from '../utils/constants';
import config from '../utils/config';
import { AuthContext } from '../context/AuthContext';
import CRUDApartmentCard from './CRUDApartmentCard';

const useStyles = makeStyles((theme) => ({
  list: {
    marginTop: theme.spacing(2),
  },
  addButton: {
    display: 'block',
    margin: 'auto',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
  },
  buttonSize: {
    height: '50px',
    width: '50px',
  },
}));

const MyListings = () => {
  const classes = useStyles();
  const { token, userInfo } = useContext(AuthContext);
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    axios.get(`${serverUrl}/apartments/${token}`, config)
      .then((res) => {
        setApartments(res.data);
      });
  }, []);

  const addNewApartment = () => {
    const newApartment = {
      id: generateUniqueID(),
      squareMeters: '',
      noRooms: '',
      floor: '',
      street: '',
      number: '',
      city: '',
      price: '',
      estimatedPrice: '',
      title: 'New apartment',
      neighbourhood: '',
      createdAt: '',
      description: '',
      imageSources: [],
      ownerUsername: userInfo.username,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      avatarSrc: userInfo.avatarSrc,
    };
    setApartments([newApartment, ...apartments]);
  };

  return (
    <div className={classes.list}>
      <IconButton
        className={classes.addButton}
        onClick={() => addNewApartment()}
      >
        <AddBoxOutlined
          className={classes.buttonSize}
          color="secondary"
        />
      </IconButton>
      {apartments.map((apartment) => (
        <CRUDApartmentCard
          key={apartment.id}
          apartment={apartment}
        />
      ))}
    </div>

  );
};

export default MyListings;
