import * as actionTypes from '../actions/actionType';
import {initialState} from './initialState';

export default function roleReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ROLES_SUCCESS:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
