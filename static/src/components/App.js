import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import * as actions from '../actions/loginActions';
import Header from './common/Header';
import Routes from './Routes';

class App extends Component {
  onLogout = () => {
    this.props.actions.logout();
  }

  render() {
    const loggedIn = this.props.loginStatus.loggedIn;
    const registered = this.props.loginStatus.loggedIn && this.props.loginStatus.currentUser.registered;


    return (
      <div>
        <Header
          displayNavigation={loggedIn}
          onLogout={this.onLogout}
        />
        <Grid className='text-center'>
          <Row>
            <Col md={12}>
              <Routes loggedIn={loggedIn} registered={registered}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
};

App.propTypes = {
  loginStatus: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    loginStatus: state.loginStatus,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
