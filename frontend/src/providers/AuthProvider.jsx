import React, { useState } from 'react';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const userCurrent = localStorage.getItem('userId') === null ? false : JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(userCurrent.username);

  const logIn = (username) => {
    setLoggedIn(username);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const getAuthHeader = (userId) => {
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, getAuthHeader,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
