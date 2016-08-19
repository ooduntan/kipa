import * as actionTypes from '../actions/actionType.js';
import {initialState} from './initialState';

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return Object.assign({}, state, action.data);
    case actionTypes.SAVING_USER:
      return Object.assign({}, state, action.data);
    case actionTypes.SAVE_USER_SUCCESS:
      return Object.assign({}, state, action.data);
    case actionTypes.CHECKING_USER:
      return Object.assign({}, state, action.data);
    case actionTypes.LOGIN_FAIL:
      return Object.assign({}, state, action.data);
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, action.data);
    case actionTypes.UPDATING_USER_DATA:
      return Object.assign({}, state, action.data);
    case actionTypes.UPDATE_STORE_WITH_USER_DATA:
      return Object.assign({}, state, action.data);
    case actionTypes.UPDATE_USER_STORE:
      return Object.assign({}, state, action.data);
    case actionTypes.UPDATE_FAILED:
      return Object.assign({}, state, action.data);
    case actionTypes.CREATE_USER_FAILED:
      return Object.assign({}, state, action.data);
    case actionTypes.UPDATED_USER_DATA:
      return Object.assign({}, state, action.data);
    case actionTypes.ACTIVATE_SUBMIT_BUTTON:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
