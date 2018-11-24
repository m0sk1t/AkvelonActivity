import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Jumbotron, PageHeader, small, Button } from 'react-bootstrap';
import { HorizontalBar } from 'react-chartjs-2';
import { Redirect  } from 'react-router';
import { Link } from 'react-router-dom';


import AchievementCard from './AchievementCard';
import * as activityActions from '../../actions/activityActions';

class MyActivityPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { shouldRedirect: false };
  }

  render() {
    const { currentUser } = this.props;
    if (!currentUser.registered) {
      return <Redirect push to={`/myActivity/register`} />;
    }

    const { shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect push to={`/teams/${currentUser.teamName}`} />;
    }

    const achievements = Object.values(currentUser.achievements || {})
      .sort((a, b) => a.name - b.name)
      .map(achievement => {
        return <AchievementCard {...achievement} />
      });

    return (
      <Jumbotron>
        <PageHeader>
          <div style={{marginBottom: 10}}>{currentUser.name}</div>
          <small>Achievements</small>
        </PageHeader>
        <div className='d-flex justify-content-start flex-wrap' style={{ marginBottom: 10 }}>
          {achievements}
        </div>
        <PageHeader style={{ marginBottom: 20 }}>
          <small>Total steps: {currentUser.totalSteps}</small>
        </PageHeader>
        <Button bsStyle="primary" onClick={() => this.setState({ shouldRedirect: true })}>My Team</Button>
      </Jumbotron>
    );
  }
};

MyActivityPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    currentUser: state.loginStatus.currentUser,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(activityActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyActivityPage);
