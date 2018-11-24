import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Jumbotron } from 'react-bootstrap';
import { HorizontalBar } from 'react-chartjs-2';
import { Redirect } from 'react-router';

import * as activityActions from '../../actions/activityActions';
import SearchPanel from '../common/SearchPanel';
import TeamCard from './TeamCard';

class SingleTeamPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { search: '', shouldRedirect: false, redirectTeamName: '' };
  }

  componentDidMount() {
    this.props.actions.loadActivity();
  }

  render() {
    const { shouldRedirect, redirectTeamName } = this.state;
    if (shouldRedirect) {
      return <Redirect push to={`/teams/${redirectTeamName}`} />;
    }

    const teams = Object.values(this.props.teamsByName)
      .sort((a, b) => a.name - b.name)
      .filter(this.shouldShow)
      .map(team => {
        return <TeamCard
          onClick={() => this.handleOnClick(team.name)}
          {...team} />
      });

    return (
      <Jumbotron>
        <SearchPanel onChange={this.handleSearch} />
        <div className='d-flex justify-content-start flex-wrap margin-top'>
          {teams}
        </div>
      </Jumbotron>
    );
  }

  shouldShow = (team) => {
    const lowerSearch = this.state.search.toLowerCase();
    const name = team.name.toLowerCase();
    return name.includes(lowerSearch);
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  }

  handleOnClick = teamName => {
    this.setState({ shouldRedirect: true, redirectTeamName: teamName });
  }
};

SingleTeamPage.propTypes = {
  teamsByName: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    teamsByName: state.teamsByName,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(activityActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTeamPage);
