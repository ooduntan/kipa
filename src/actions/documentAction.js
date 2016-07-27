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

export function savingDoc() {
  return {
    type: actionTypes.CREATING_DOC,
    data: {
      success: false
    }
  };
}

export function updateStoreWithNewDoc(docData) {
  return {
    type: actionTypes.UPDATE_STORE_WITH_NEW_DOC,
    data: {
      newDoc: [docData.newDoc],
      successState: true
    }
  };
}

export function prepareModalForEdit(docData) {
  return {
    type: actionTypes.PREPARING_MODAL,
    data: {
      modalData:{
        title: 'Edit Document',
        actionText: 'Update',
        labelClass: 'active',
        docData: docData
      }
    }
  };
}

export function prepareModalNewDoc() {
  return {
    type: actionTypes.PREPARING_MODAL,
    data: {
      modalData:{
        title: 'Create new document',
        actionText: 'Create',
        labelClass: '',
        docData: {}
      }
    }
  };
}

export function docDeleted(docsInState) {
  return {
    type: actionTypes.DELETE_DOC_SUCCESS,
    data: {
      docs: docsInState
    }
  };
}

export function deletingDoc() {
  return {

  }
  // body...
}

export function createDocSuccess() {
  return {
    type: actionTypes.CREATE_DOC_SUCCESS,
    data: {
      success: true
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

export function deleteDocAction(docId, docsInState) {
  return (dispatch) => {
    const url = 'api/documents/' + docId;
    return apiRequest(null, 'delete', url, function(apiResult) {
       dispatch(docDeleted(docsInState, apiResult));
    });
  };
}

export function createDoc(docData, formObj) {
  return (dispatch) =>{
    dispatch(savingDoc());
    const url = 'api/documents/';
    return apiRequest(docData, 'post', url, function(apiResult) {
      formObj.reset();
       dispatch(updateStoreWithNewDoc(apiResult));
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
