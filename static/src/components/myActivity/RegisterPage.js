import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Jumbotron,
  FormGroup,
  ControlLabel,
  Button,
  FormControl,
} from 'react-bootstrap';
import { HorizontalBar } from 'react-chartjs-2';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { CirclePicker } from 'react-color';

import * as activityActions from '../../actions/activityActions';

const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

class RegisterPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      wantJoinTeam: false,
      wantCreateTeam: false,
      shouldRedirect: false,
    };
  }

  render() {
    const { currentUser, teamsByName } = this.props;
    const { wantJoinTeam, wantCreateTeam } = this.state;

    if (currentUser.registered) {
      return <Redirect push to={`/myActivity`} />;
    }

    return (
      <Jumbotron>
        <div style={{ marginBottom: 20 }}><h2>Register</h2></div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <form style={{ width: '50%' }}>

          {!wantJoinTeam && <Button
              bsStyle="primary"
              style={{ marginBottom: 20 }}
              onClick={() => this.setState({ wantJoinTeam: true })}>
              Want To Join A Team?
          </Button>}

          {wantJoinTeam && wantCreateTeam && <Button
            bsStyle="primary"
            style={{ marginBottom: 20 }}
            onClick={() => this.setState({ wantCreateTeam: false })}>
            Back
          </Button>}

          {wantJoinTeam && !wantCreateTeam && <div>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Chouse your team</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                {Object.values(teamsByName).map(team => {
                  return <option value={team.name}>{team.name}</option>
                })}
              </FormControl>
            </FormGroup>
            <Button
              bsStyle="primary"
              style={{ marginBottom: 20 }}
              onClick={() => this.setState({ wantCreateTeam: true })}>
              Create New
            </Button>
          </div>}

          {wantJoinTeam && wantCreateTeam && <div>
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Team Name"
              placeholder="Enter name"
            />
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select team color</ControlLabel>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
                <CirclePicker />
              </div>
            </FormGroup>
            <FormGroup controlId="formControlsFile">
              <ControlLabel>Team Icon</ControlLabel>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
                <FormControl type="file" />
              </div>
            </FormGroup>
          </div>}

          <hr />

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select your color</ControlLabel>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 20,
            }}>
              <CirclePicker />
            </div>
          </FormGroup>

          <Button bsStyle="primary" type="submit">Join Akvelon Activity</Button>
          </form>
        </div>
      </Jumbotron>
    );
  }
};

RegisterPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    teamsByName: state.teamsByName,
  };
};


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(activityActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
