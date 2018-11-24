import { LOAD_TEAMS_SUCCESS, REGISTER_EMPLOYEE_SUCCESS } from '../constants/actionTypes';

export default function teamsReducers(state = {}, action) {
  switch (action.type) {
    case LOAD_TEAMS_SUCCESS:
      return { ...action.teamsByName, ...state };

    case REGISTER_EMPLOYEE_SUCCESS:
      const newState = { ...state };
      const team = newState[action.employee.teamName];
      team.memberIds.push(action.employee.id);
      return newState;

    default:
      return state;
  }
}
