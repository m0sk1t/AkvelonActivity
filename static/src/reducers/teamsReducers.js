import { LOAD_TEAMS_SUCCESS } from '../constants/actionTypes';

export default function teamsReducers(state = {}, action) {
  switch (action.type) {
    case LOAD_TEAMS_SUCCESS:
      return action.teamsByName;

    default:
      return state;
  }
}
