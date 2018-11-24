import React, { Component } from 'react';
import MenuNavigation from './MenuNavigation';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { LogoutButton } from '../common/FAButtons';
import { Redirect } from 'react-router';

class Header extends Component {
  render() {
    return (
      <nav className='navbar navbar-light bg-faded'>
        <Link to='/home' className='navbar-brand'>Akvelon Activity</Link>
        {this.props.displayNavigation
          ? <MenuNavigation/>
          : null}
        {this.props.displayNavigation
          ? <span>
            &nbsp;
            <LogoutButton onClick={this.props.onLogout} />
            </span>
          : null}
      </nav>
    );
  }
};

export default Header;
