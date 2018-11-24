import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Jumbotron } from 'react-bootstrap';
import { HorizontalBar } from 'react-chartjs-2';
import { Redirect } from 'react-router';

import {
  OPACITY_20_PERC,
  OPACITY_40_PERC,
  OPACITY_100_PERC,
} from '../../constants/hexOpacity';
import * as activityActions from '../../actions/activityActions';

class SingleTeamPage extends Component {
  render() {
    const { teamsByName, employeesById } = this.props;
    if (Object.keys(teamsByName).length === 0 || Object.keys(employeesById).length === 0) {
      return <Redirect push to={`/home`} />;
    }

    const teamName = this.props.match.params.name;
    const teamMembersIds = teamsByName[teamName].memberIds;
    const teamMembers = teamMembersIds.map(id => employeesById[id])

    const memberNames = [];
    const memberSteps = [];
    const memberColors = [];
    let suggestedMax = 0;
    teamMembers
      .sort((a, b) => b.totalSteps - a.totalSteps)
      .forEach(member => {
        memberNames.push(member.name);
        memberColors.push(member.color);
        memberSteps.push(member.totalSteps);
        if (member.totalSteps >= suggestedMax) {
          suggestedMax = member.totalSteps + 5000 - (member.totalSteps % 5000)
        }
      });

    const data = {
      labels: memberNames,
      datasets: [
        {
          backgroundColor: memberColors.map(c => c + OPACITY_20_PERC),
          borderColor: memberColors.map(c => c + OPACITY_100_PERC),
          borderWidth: 1,
          hoverBackgroundColor: memberColors.map(c => c + OPACITY_40_PERC),
          hoverBorderColor: memberColors.map(c => c + OPACITY_100_PERC),
          data: memberSteps,
        }
      ]
    };

    const options = {
      title: {
        display: true,
        text: `Team ${teamName}`,
        fontSize: 18,
      },
      legend: { display: false },
      tooltips: { enabled: true, labels: {}, displayColors: false },
      scales: {
        xAxes: [{
          id: 'x-axis',
          type: 'linear',
          position: 'top',
          ticks: {
            offset: true,
            beginAtZero: true,
            stepSize: 5000,
            suggestedMax,
          }
        }]
      },
      maintainAspectRatio: true
    };

    return (
      <Jumbotron>
        <HorizontalBar
          height={120}
          data={data}
          options={options}
        />
      </Jumbotron>
    );
  }
};

SingleTeamPage.propTypes = {
  teamsByName: PropTypes.object.isRequired,
  employeesById: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    teamsByName: state.teamsByName,
    employeesById: state.employeesById,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(activityActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTeamPage);
