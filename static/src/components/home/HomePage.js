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

class HomePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { shouldRedirect: false, redirectTeamName: ''};
  }

  componentDidMount() {
    this.props.actions.loadActivity();
  }

  render() {
    const { shouldRedirect, redirectTeamName } = this.state;
    if (shouldRedirect) {
      return <Redirect push to={`/teams/${redirectTeamName}`} />;
    }

    const { teamsByName, employeesById } = this.props;
    const teamNames = [];
    const teamSteps = [];
    const teamColors = [];
    let teamsSuggestedMax = 0;
    Object.values(teamsByName)
      .sort((a, b) => b.totalSteps - a.totalSteps)
      .forEach(team => {
        teamNames.push(team.name);
        teamColors.push(team.color);
        const totalSteps = team.memberIds.reduce((sum, id) => employeesById[id] ? sum + employeesById[id].totalSteps : sum)
        teamSteps.push(totalSteps);
        if (team.totalSteps >= teamsSuggestedMax) {
          teamsSuggestedMax = team.totalSteps + 5000 - (team.totalSteps % 5000)
        }
      });

    const teamsData = {
      labels: teamNames,
      datasets: [
        {
          backgroundColor: teamColors.map(c => c + OPACITY_20_PERC),
          borderColor: teamColors.map(c => c + OPACITY_100_PERC),
          borderWidth: 1,
          hoverBackgroundColor: teamColors.map(c => c + OPACITY_40_PERC),
          hoverBorderColor: teamColors.map(c => c + OPACITY_100_PERC),
          data: teamSteps,
        }
      ]
    };

    const teamsOptions = {
      title: {
        display: true,
        text: 'Teams Competition',
        fontSize: 18,
      },
      legend: { display: false },
      tooltips: { enabled: true, fontSize: 20, labels: {}, displayColors: false },
      scales: {
        xAxes: [{
          id: 'x-axis',
          type: 'linear',
          position: 'top',
          ticks: {
            offset: true,
            beginAtZero: true,
            stepSize: 5000,
            teamsSuggestedMax,
            fontSize: 14,
          },
        }]
      },
      maintainAspectRatio: true,
      defaultFontSize: 20,
    };

    const employeeNames = [];
    const employeeSteps = [];
    const employeeColors = [];
    let employeesSuggestedMax = 0;
    Object.values(employeesById)
      .sort((a, b) => b.totalSteps - a.totalSteps)
      .forEach(employee => {
        employeeNames.push(employee.name);
        employeeColors.push(employee.color);
        employeeSteps.push(employee.totalSteps);
        if (employee.totalSteps >= employeesSuggestedMax) {
          employeesSuggestedMax = employee.totalSteps + 5000 - (employee.totalSteps % 5000)
        }
      });

    const employeesData = {
      labels: employeeNames,
      datasets: [
        {
          backgroundColor: employeeColors.map(c => c + OPACITY_20_PERC),
          borderColor: employeeColors.map(c => c + OPACITY_100_PERC),
          borderWidth: 1,
          hoverBackgroundColor: employeeColors.map(c => c + OPACITY_40_PERC),
          hoverBorderColor: employeeColors.map(c => c + OPACITY_100_PERC),
          data: employeeSteps,
        }
      ]
    };

    const employeesOptions = {
      title: {
        display: true,
        text: 'Employees Competition',
        fontSize: 18,
      },
      legend: { display: false },
      tooltips: { enabled: true, fontSize: 20, labels: {}, displayColors: false },
      scales: {
        xAxes: [{
          id: 'x-axis',
          type: 'linear',
          position: 'top',
          ticks: {
            offset: true,
            beginAtZero: true,
            stepSize: 5000,
            employeesSuggestedMax,
            fontSize: 14,
          },
        }]
      },
      maintainAspectRatio: true,
      defaultFontSize: 20,
    };

    return (
      <Jumbotron>
        <HorizontalBar
          height={120}
          data={teamsData}
          options={teamsOptions}
          onElementsClick={e => e[0] && this.handleOnClick(e[0]._model.label)}
        />
        <HorizontalBar
          height={200}
          data={employeesData}
          options={employeesOptions}
        />
      </Jumbotron>
    );
  }

  handleOnClick = teamName => {
    this.setState({ shouldRedirect: true, redirectTeamName: teamName });
  }
};

HomePage.propTypes = {
  teamsByName: PropTypes.object.isRequired,
  employeesById: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
