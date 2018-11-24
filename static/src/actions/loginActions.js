import { SET_LOGIN_STATUS, LOGOUT_SUCCESS, LOAD_USER_SUCCESS } from '../constants/actionTypes';
import LoginApi from '../api/LoginApi';

export function checkLoginStatus() {
  return function (dispatch) {
    return dispatch(setLoginStatus(LoginApi.checkLoginStatus()));
  }
}

export function setLoginStatus(loginStatus) {
  return { type: SET_LOGIN_STATUS, loginStatus };
}

export function login({ username, password, rememberMe }) {
  return function (dispatch) {
    return LoginApi.login(username, password, rememberMe).then(loginStatus => {
      dispatch(setLoginStatus(loginStatus));
      dispatch(loadUserSuccess(loginStatus.currentUser));
    }).catch(err => { throw (err) });
  }
}

export function logout() {
  return function (dispatch) {
    return LoginApi.logout().then((loginStatus) => {
      dispatch(setLoginStatus(loginStatus));
      dispatch(logoutSuccess());
    }).catch(err => { throw (err) });
  }
}

export function logoutSuccess() {
  return { type: LOGOUT_SUCCESS };
}

export function loadUserSuccess(currentUser) {
  return { type: LOAD_USER_SUCCESS, currentUser };
}
