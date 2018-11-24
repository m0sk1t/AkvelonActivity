import React from 'react';
import MenuNavigation from './MenuNavigation';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { LogoutButton } from '../common/FAButtons';

const Header = ({ displayNavigation, onLogout }) => {
  return (
    <nav className='navbar navbar-light bg-faded'>
      <Link to='/home' className='navbar-brand'>Akvelon Activity</Link>
      {displayNavigation
        ? <MenuNavigation/>
        : null}
      {displayNavigation
        ? <span>
          <Button bsStyle="success" href='/auth/google'>Connect your Google Fit Account</Button>
          &nbsp;
          <LogoutButton onClick={onLogout} />
          </span>
        : null}
    </nav>
  );
};

export default Header;
