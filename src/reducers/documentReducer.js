import * as actionTypes from '../actions/actionType.js';
import {initialState} from './initialState';

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHECK_USER_DOCS:
      return Object.assign({}, state, action.data);
    case actionTypes.CHANGE_CONTENT:
      return Object.assign({}, state, action.data);
    case actionTypes.GETTING_USER_DOCS:
      return Object.assign({}, state);
    case actionTypes.USER_DOCS_SUCCESS:
      return Object.assign({}, state, action.data);
    case actionTypes.SHARED_DOCUMENTS:
      return Object.assign({}, state, action.data);
    case actionTypes.CREATING_DOC:
      return Object.assign({}, state, action.data);
    case actionTypes.CREATE_DOC_SUCCESS:
      return Object.assign({}, state, action.data);
    case actionTypes.DELETE_DOC_SUCCESS:
      return Object.assign({}, state, action.data);
    case actionTypes.PREPARE_EDIT_PAGE:
      return Object.assign({}, state, action.data);
    case actionTypes.UPDATE_STORE_WITH_NEW_DOC:
      return Object.assign({}, state, {
        docs: [...action.data.newDoc, ...state.docs]
      }, {
        docSuccess: action.data.successState
      });
    case actionTypes.UPDATING_DOC_DATA:
      return Object.assign({}, state, action.data);
    case actionTypes.UPDATED_DOCUMENT_DATA:
      return Object.assign({}, state, action.data);
    case actionTypes.REDIRECT_USER:
      return Object.assign({}, state, action.data);
    case actionTypes.CREATE_MODAL_FOR_DELETE:
      return Object.assign({}, state, action.data);
    case actionTypes.SEARCHING_DOCUMENT:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
