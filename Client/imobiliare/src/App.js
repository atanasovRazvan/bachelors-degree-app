import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './authentication/Login';
import AuthProvider from './context/AuthContext';
import Register from './authentication/Register';
import ApartmentDetailsPage from './apartment-details/ApartmentDetailsPage';
import ApartmentListPage from './apartments-view/ApartmentListPage';
import PrivateRoute from './utils/PrivateRoute';
import NotFoundPage from './notfound/NotFoundPage';
import MyProfilePage from './myprofile/MyProfilePage';
import MyListingsPage from './mylistings/MyListingsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact strict path="/" component={ApartmentListPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/apartment/:id" component={ApartmentDetailsPage} />
          <PrivateRoute exact path="/myprofile" component={MyProfilePage} />
          <PrivateRoute exact path="/mylistings" component={MyListingsPage} />
          <Route path="/notfound" component={NotFoundPage} />
          <Redirect to="/notfound" />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
