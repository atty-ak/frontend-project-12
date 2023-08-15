import React, { useState } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const userCurrent = localStorage.getItem('userId') === null ? false : JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(userCurrent.username);

  const logIn = async ({ username, password }) => {
    const { data } = await axios.post(routes.loginPath(), { username, password });
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn(username);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const signup = async ({ username, password }) => {
    const { data } = await axios.post(routes.signupPath(), { username, password });
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn(username);
  };

  const getAuthHeader = (userId) => {
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, signup, getAuthHeader,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
