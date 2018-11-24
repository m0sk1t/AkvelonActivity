import React from 'react';
import { NavLink } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

const MenuNavigation = () => {
  return (
    <div className='navbar-nav mr-auto'>
      <NavLink exact to='/home' className='nav-item'
        activeClassName='nav-item active'>Home</NavLink>
      <NavLink exact to='/teams' className='nav-item'
        activeClassName='nav-item active'>Teams</NavLink>
      <NavLink exact to='/myActivity' className='nav-item'
        activeClassName='nav-item active'>My Activity</NavLink>
    </div>
  );
};

export default MenuNavigation;
