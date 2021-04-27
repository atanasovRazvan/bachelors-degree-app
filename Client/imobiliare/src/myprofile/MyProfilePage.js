import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from '../navigation-bar/Navbar';
import MyProfile from './MyProfile';

const MyProfilePage = () => (
  <div>
    <CssBaseline />
    <Navbar />
    <MyProfile />
  </div>
);

export default MyProfilePage;
