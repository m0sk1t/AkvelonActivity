import { LOAD_EMPLOYEES_SUCCESS, REGISTER_EMPLOYEE_SUCCESS } from '../constants/actionTypes';

export default function employeesReducers(state = {}, action) {
  switch (action.type) {
    case LOAD_EMPLOYEES_SUCCESS:
      return action.employeesById;

    case REGISTER_EMPLOYEE_SUCCESS:
      const employee = action.employee;
      return { ...state, [employee.id]: employee };

    default:
      return state;
  }
}
