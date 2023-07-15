import React from 'react';
import useAuth from '../hooks/useAuth';

const ExitButton = () => {
  const { loggedIn, logOut } = useAuth();

  if (!loggedIn) {
    return '';
  }

  return (
    <button type="button" className="btn btn-primary" onClick={logOut}>Выйти</button>
  );
};

const NavBar = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <a className="navbar-brand" href="/" style={{ display: 'inline-block' }}>
        Hexlet Chat
      </a>
      <ExitButton />
    </div>
  </nav>
);

export default NavBar;
