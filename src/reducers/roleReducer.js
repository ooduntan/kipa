import * as actionTypes from '../actions/actionType';
import {roles} from './initialState';

export default function roleReducer(state = roles, action) {
  switch (action.type) {
    case actionTypes.FETCH_ROLES_SUCCESS:
      return Object.assign({}, state, action.data);
      break;
    default:
      return state;
  }
  // body...
}
