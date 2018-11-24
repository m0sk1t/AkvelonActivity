import React from 'react';
import MenuNavigation from './MenuNavigation';
import { Link } from 'react-router-dom';

import { LogoutButton } from '../common/FAButtons';

const Header = ({ displayNavigation, onLogout }) => {
  return (
    <nav className='navbar navbar-light bg-faded'>
      <Link to='/home' className='navbar-brand'>Akvelon Activity</Link>
      {displayNavigation
        ? <MenuNavigation/>
        : null}
      {displayNavigation
        ? <LogoutButton onClick={onLogout}/>
        : null}
    </nav>
  );
};

export default Header;
