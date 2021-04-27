import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from '../navigation-bar/Navbar';
import MyListings from './MyListings';

const MyListingsPage = () => (
  <div>
    <CssBaseline />
    <Navbar />
    <MyListings />
  </div>
);

export default MyListingsPage;
