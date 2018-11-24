
import { SET_LOGIN_STATUS, REGISTER_EMPLOYEE_SUCCESS } from '../constants/actionTypes';

const initialState = { loggedIn: false };

export default function loginReducers(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return { ...state, ...action.loginStatus };

    case REGISTER_EMPLOYEE_SUCCESS:
      const employee = action.employee;
      return { ...state, currentUser: employee };

    default:
      return state;
  }
}
