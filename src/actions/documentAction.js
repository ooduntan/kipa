import * as actionTypes from './actionType.js';
import {apiRequest} from '../utils/apiRequest';

export function getUserDocs() {
  return {
    type: actionTypes.GET_USER_DOCS,
    data: {looding: true}
  };
}

export function ValidateUser() {
  console.log('I validated the user');
}

export function showMenuContent(nextView) {
  return {
    type: actionTypes.CHANGE_CONTENT,
    data: { header: nextView.replace('_', ' ') }
  };
}

export function getSharedDocSuccess(sharedDocs) {
  return {
    type: actionTypes.SHARED_DOCUMENTS,
    data: {sharedDocs}
  };
}

export function gettingUserDocs() {
  return {
    type: actionTypes.GETTING_USER_DOCS
  };
}

export function getDocsSuccess(docs) {
  return {
    type: actionTypes.USER_DOCS_SUCCESS,
    data: {
      success: true,
      docs: docs.doc
    }
  };
}

export function getsharedDocument(userData) {
  return (dispatch) => {
     dispatch(gettingUserDocs());
    const url ='api/documents?role=' + userData.role;
    return apiRequest(null, 'get', url, function(apiResult) {
      dispatch(getSharedDocSuccess(apiResult));
      return dispatch(getUserDocs(userData._id));
    });
 };
}

export function getUserDocs(userId) {
  return (dispatch) => {
    dispatch(gettingUserDocs());
    const url = 'api/users/' + userId + '/documents';
    return apiRequest(null, 'get', url, function(apiResult) {
      dispatch(getDocsSuccess(apiResult));
    });
  };
}

export function getComponentResources(userData) {
  return (dispatch) => {
    if (userData) {
      return dispatch(getsharedDocument(userData));
    }
    return dispatch(ValidateUser());
  };
}
