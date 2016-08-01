import * as actionTypes from './actionType.js';
import {
  apiRequest
} from '../utils/apiRequest';

export function getUserDocs() {
  return {
    type: actionTypes.GET_USER_DOCS,
    data: {
      looding: true
    }
  };
}

export function showMenuContent(nextView) {
  return {
    type: actionTypes.CHANGE_CONTENT,
    data: {
      header: nextView.replace('_', ' ')
    }
  };
}

export function getSharedDocSuccess(sharedDocs) {
  return {
    type: actionTypes.SHARED_DOCUMENTS,
    data: {
      sharedDocs
    }
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
      docSuccess: true,
      docs: docs.doc
    }
  };
}

export function savingDoc() {
  return {
    type: actionTypes.CREATING_DOC,
    data: {
      docSuccess: false
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

export function preparePageForEdit(docData, owner) {
  return {
    type: actionTypes.PREPARE_EDIT_PAGE,
    data: {
      editDocumentData: {
        docData: docData,
        ownerPage: owner
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

export function sharedDocsDeleted(docsInState) {
  return {
    type: actionTypes.DELETE_DOC_SUCCESS,
    data: {
      sharedDocs: docsInState
    }
  };
}

export function updatingDocData() {
  return {
    type: actionTypes.UPDATING_DOC_DATA,
    data: {
      editPreLoader: false
    }
  };
}

export function deletingDoc() {
  return {

  };
  // body...
}

export function createDocSuccess() {
  return {
    type: actionTypes.CREATE_DOC_SUCCESS,
    data: {
      docSuccess: true
    }
  };
}

export function updateUserStore(userData) {
  return {
    type: actionTypes.UPDATE_USER_STORE,
    data: {userData}
  };
}

export function editDocSuccess() {
  // UPdate the store very well and this will work as expected
  return {
    type: actionTypes.UPDATED_DOCUMENT_DATA,
    data: {editSuccess: true}
  };
}

export function InvalidUser() {
  return {
    type: actionTypes.REDIRECT_USER,
    data: {redirect: true}
  };
}

export function getsharedDocument(userData) {
  return (dispatch) => {
    dispatch(gettingUserDocs());
    const url = 'api/documents?role=' + userData.role;
    return apiRequest(null, 'get', url, function(apiResult) {
      dispatch(getSharedDocSuccess(apiResult));
      return dispatch(getUserDocs(userData._id));
    });
  };
}

export function deleteDocAction(docId) {
  return (dispatch) => {
    const url = 'api/documents/' + docId;
    return apiRequest(null, 'delete', url, function(apiResult) {
      return dispatch(getComponentResources({}));
      // if (pageName === 'SHARED DOCUMENTS') {
      //   return dispatch(sharedDocsDeleted(docsInState, apiResult));
      // }
      // return dispatch(docDeleted(docsInState, apiResult));
    });
  };
}

export function createDoc(docData, formObj) {
  return (dispatch) => {
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

export function upadateDocument(newDocData, docId) {
  return (dispatch) => {
    dispatch(updatingDocData());
    const url = '/api/documents/' + docId;
    return apiRequest(newDocData, 'put', url, function(apiResult) {
        dispatch(getComponentResources({}));
        dispatch(editDocSuccess());
      });
  };
}

export function ValidateUser() {
  return (dispatch) => {
    const url = 'api/users/getData';
    return apiRequest(null, 'get', url, function(apiResult) {
      if (apiResult.user) {
        dispatch(updateUserStore(apiResult.user));
        return dispatch(getComponentResources(apiResult.user));
      }
      return dispatch(InvalidUser());
    });
  };
}

export function getComponentResources(userData) {
  return (dispatch) => {
    if (Object.keys(userData).length) {
      return dispatch(getsharedDocument(userData));
    }
    return dispatch(ValidateUser());
  };
}
