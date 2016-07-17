import * as actionTypes from '../actions/actionType.js';
import * as initialState from './initialState';

export default function userReducer(state = initialState.saveUser, action) {
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return Object.assign({}, action.data);
      break;
    case actionTypes.SAVING_USER:
      return Object.assign({}, action.data);
      break;
    case actionTypes.SAVE_USER_SUCCESS:
      return Object.assign({}, action.data);
      break;
    case actionTypes.CHECKING_USER:
      return Object.assign({}, state, action.data);
      break;
    case actionTypes.LOGIN_FAIL:
      return Object.assign({}, action.data);
      break;
    case actionTypes.LOGIN_SUCCESS:
      console.log(Object.assign({}, action.data, {displayLoader: 'hide-element'}));
      return Object.assign({}, action.data);
      break;
    default:
      return state;
  }
}
