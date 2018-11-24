import React, { Component } from 'react';
import MenuNavigation from './MenuNavigation';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { LogoutButton } from '../common/FAButtons';
import { Redirect } from 'react-router';

class Header extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { shouldRedirect: false };
  }

  render() {
    if (this.state.shouldRedirect) return <Redirect push to={`/auth/google`} />;

    return (
      <nav className='navbar navbar-light bg-faded'>
        <Link to='/home' className='navbar-brand'>Akvelon Activity</Link>
        {this.props.displayNavigation
          ? <MenuNavigation/>
          : null}
        {this.props.displayNavigation
          ? <span>
            {/* <Button onClick={() => this.setState({ shouldRedirect: true })} bsStyle="success" >Connect your Google Fit Account</Button> */}
            <a href={'/auth/google'} >Connect your Google Fit Account</a>
            &nbsp;
            <LogoutButton onClick={this.props.onLogout} />
            </span>
          : null}
      </nav>
    );
  }
};

export default Header;
