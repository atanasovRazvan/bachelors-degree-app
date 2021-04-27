import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ exact, path, component }) => {
  const { token } = useContext(AuthContext);

  return (
    token
      ? <Route path={path} exact={exact} component={component} />
      : <Redirect to="/notfound" />
  );
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

PrivateRoute.defaultProps = {
  exact: false,
};

export default PrivateRoute;
