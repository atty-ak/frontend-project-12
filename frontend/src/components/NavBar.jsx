import React from 'react';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

const ExitButton = () => {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation('translation', { keyPrefix: 'navBar' });

  if (!loggedIn) {
    return '';
  }

  return (
    <button type="button" className="btn btn-primary" onClick={logOut}>{t('logOut')}</button>
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
