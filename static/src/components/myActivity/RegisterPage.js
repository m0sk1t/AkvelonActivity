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
      currentUser: this.props.currentUser,
      color: '',
      teamName: '',
    };
  }

  render() {
    const { teamsByName } = this.props;
    const { wantJoinTeam, wantCreateTeam, currentUser, color, teamName } = this.state;

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
                <FormControl value={teamName} componentClass="select" onChange={(e) => this.setState({ teamName: e.target.value })}>
                {Object.values(teamsByName).map(team => {
                    return <option key={team.name} value={team.name}>{team.name}</option>
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
                <CirclePicker color={color} onChangeComplete={ this.handleChangeComplete }/>
            </div>
          </FormGroup>

            <Button bsStyle="primary" onClick={this.handleFormSubmit}>Join Akvelon Activity</Button>
          </form>
        </div>
      </Jumbotron>
    );
  }

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
  }

  handleFormSubmit = () => {
    this.props.actions.registerEmployee(
      {
        ...this.state.currentUser,
        registered: true,
        totalSteps: 756,
        color: this.state.color,
        teamName: this.state.teamName,
      });
  }
};

RegisterPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    currentUser: state.loginStatus.currentUser,
    teamsByName: state.teamsByName,
  };
};


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(activityActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
