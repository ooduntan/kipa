import * as actionTypes from "./actionType.js";
import {apiRequest} from "../utils/apiRequest";

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
      docs: docs.doc,
      editSuccess: false
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

export function preparePageForEdit(docData) {
  return {
    type: actionTypes.PREPARE_EDIT_PAGE,
    data: {
      editDocumentData: docData
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
  return {};
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

export function updateStoreWithUserData(userData) {
  return {
    type: actionTypes.UPDATE_STORE_WITH_USER_DATA,
    data: {userData}
  };
}

export function editDocSuccess() {
  return {
    type: actionTypes.UPDATED_DOCUMENT_DATA,
    data: {
      editPreLoader: true,
      editSuccess: true,
      editDocumentData: {
        title: '',
        content: '',
        access: ''
      }
    }
  };
}

export function updateSearch() {
  return {
    type: actionTypes.UPDATE_SEARCH_RESULT,
    data: {
      updateSearch: true
    }
  };
}

export function InvalidUser() {
  return {
    type: actionTypes.REDIRECT_USER,
    data: {redirect: true}
  };
}

export function createModalData(selectedDoc) {
  return {
    type: actionTypes.CREATE_MODAL_FOR_DELETE,
    data: {
      deleteDoc: selectedDoc
    }
  };
}

export function addingMoreDocToStore() {
  return {
    type: actionTypes.ADDING_MORE_DOC_TO_STORE,
    data: {lazyLoading: true}
  };
}

export function updatedStoreWithMoreDocs(result) {
  return {
    type: actionTypes.ADD_MORE_DOC_TO_STORE,
    data: {
      docs: result.doc,
      lazyLoading: false
    }
  };
}

export function getsharedDocument(userData) {
  return (dispatch) => {
    dispatch(gettingUserDocs());
    const url = '/api/documents?role=' + userData.role._id;
    return apiRequest(null, 'get', url, function (apiResult) {
      dispatch(getSharedDocSuccess(apiResult));
      return dispatch(getUserDocs(userData._id));
    });
  };
}

export function updatedStoreWithSharedDocs(newDocs) {
  return {
    type: actionTypes.ADD_MORE_SHARED_DOCS,
    data: {
      docs: newDocs.doc,
      lazyLoading: false
    }
  };
}

export function addSharedDocs(offset, userRole) {
  return (dispatch) => {
    dispatch(addingMoreDocToStore());
    const url = '/api/documents?role=' + userRole + '&offset=' + offset;
    return apiRequest(null, 'get', url, function (apiResult) {
      return dispatch(updatedStoreWithSharedDocs(apiResult));
    });
  };
}

export function addOwnedDocs(offset, userId) {
  return (dispatch) => {
    dispatch(addingMoreDocToStore());
    const url = '/api/users/' + userId + '/documents/?offset=' + offset;
    return apiRequest(null, 'get', url, function (apiResult) {
      return dispatch(updatedStoreWithMoreDocs(apiResult));
    });
  };
}

export function deleteDocAction(docId) {
  return (dispatch) => {
    const url = '/api/documents/' + docId;
    return apiRequest(null, 'delete', url, function (apiResult) {
      return dispatch(getComponentResources({}));
    });
  };
}

export function createDoc(docData, username) {
  return (dispatch) => {
    dispatch(savingDoc());
    const url = '/api/documents/';
    return apiRequest(docData, 'post', url, function (apiResult) {
      apiResult.newDoc.creator = {username};
      dispatch(updateStoreWithNewDoc(apiResult));
    });
  };
}

export function getUserDocs(userId) {
  return (dispatch) => {
    dispatch(gettingUserDocs());
    const url = '/api/users/' + userId + '/documents';
    return apiRequest(null, 'get', url, function (apiResult) {
      dispatch(getDocsSuccess(apiResult));
    });
  };
}

export function upadateDocument(newDocData, docId) {
  return (dispatch) => {
    dispatch(updatingDocData());
    const url = '/api/documents/' + docId;
    return apiRequest(newDocData, 'put', url, function (apiResult) {
      dispatch(getComponentResources({}));
      dispatch(editDocSuccess());
    });
  };
}

export function ValidateUser() {
  return (dispatch) => {
    const url = '/api/users/getData';
    return apiRequest(null, 'get', url, function (apiResult) {
      if (apiResult.user) {
        dispatch(updateStoreWithUserData(apiResult.user));
        return dispatch(getComponentResources(apiResult.user));
      }
      return dispatch(InvalidUser());
    });
  };
}

export function updatePageWithEditData(docId) {
  return (dispatch) => {
    const url = '/api/documents/' + docId;
    return apiRequest(null, 'get', url, function (apiResult) {
      return dispatch(preparePageForEdit(apiResult.doc));
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
