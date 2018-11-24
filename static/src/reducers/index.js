import { combineReducers } from 'redux';
import employeesById from './employeesReducers';
import loginStatus from './loginReducers';
import teamsByName from './teamsReducers';
import currentUser from './userReducers';

import { LOGOUT_SUCCESS } from '../constants/actionTypes';

const appReducer = combineReducers({ employeesById, loginStatus, teamsByName, currentUser })

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
