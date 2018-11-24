import { LOAD_TEAMS_SUCCESS, LOAD_EMPLOYEES_SUCCESS, LOAD_USER_SUCCESS, REGISTER_EMPLOYEE_SUCCESS } from '../constants/actionTypes';
import ActivityAPI from '../api/ActivityAPI';
import { push } from 'react-router-redux'

export function loadActivity() {
  return function (dispatch) {
    return ActivityAPI.getActivity().then(activity => {
      dispatch(loadTeamsSuccess(activity.teamsByName));
      dispatch(loadEmployeesSuccess(activity.employeesById));
    }).catch(err => { throw (err) });
  }
}

export function registerEmployee(currentUser) {
  console.log('USER', currentUser)
  return function (dispatch) {
    return ActivityAPI.registerEmployee(currentUser).then(activity => {
      dispatch(registerEmployeeSuccess(currentUser));
    }).catch(err => { throw (err) });
  }
}

export function loadTeamsSuccess(teamsByName) {
  return { type: LOAD_TEAMS_SUCCESS, teamsByName };
}

export function loadEmployeesSuccess(employeesById) {
  return { type: LOAD_EMPLOYEES_SUCCESS, employeesById };
}

export function registerEmployeeSuccess(employee) {
  return { type: REGISTER_EMPLOYEE_SUCCESS, employee };
}


