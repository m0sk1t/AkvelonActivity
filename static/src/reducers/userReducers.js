import { LOAD_USER_SUCCESS } from '../constants/actionTypes';

export default function userReducers(state = {}, action) {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return action.currentUser;

    default:
      return state;
  }
}
