import * as actionTypes from '../actions/actionType.js';
import * as initialState from './initialState';

export default function userReducer(state = initialState.saveUser, action) {
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return Object.assign({}, action.data);
    case actionTypes.SAVING_USER:
      return Object.assign({}, action.data);
    case actionTypes.SAVE_USER_SUCCESS:
      return Object.assign({}, action.data);
    case actionTypes.CHECKING_USER:
      return Object.assign({}, state, action.data);
    case actionTypes.LOGIN_FAIL:
      return Object.assign({}, state, action.data);
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
