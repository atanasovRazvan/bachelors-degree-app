import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userinfo')) || null);

  const updateUserInfo = (requestUserInfo, isRemembered) => {
    setUserInfo(requestUserInfo);
    if (isRemembered === true || localStorage.getItem('token')) {
      localStorage.setItem('userinfo', JSON.stringify(requestUserInfo));
    }
  };

  const updateToken = (requestToken, isRemembered) => {
    setToken(requestToken);
    if (isRemembered === true) {
      localStorage.setItem('token', requestToken);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userinfo');
  };

  const value = {
    userInfo,
    token,
    updateUserInfo,
    updateToken,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
