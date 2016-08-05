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
  console.log(docData, 'action logger');
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

export function updateStoreWithUserData(userData) {
  console.log(userData, 'form the action');
  return {
    type: actionTypes.UPDATE_STORE_WITH_USER_DATA,
    data: {userData}
  };
}

export function editDocSuccess() {
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

export function createModalData(selectedDoc) {
  return {
    type: actionTypes.CREATE_MODAL_FOR_DELETE,
    data: {
      deleteDoc: selectedDoc
    }
  };
}

// export function searchDocument(searchTerm) {
//   return (dispatch) => {
//     // Complete this fucntion
//     dispatch(searchingDocument());
//     const url = 'api/document?q=' +  searchTerm;
//     return apiRequest(null, 'get', url, function (searchResult) {
//       // Complete this function
//       dispatch(searchCompleted(searchResult));
//     });
//   };
// }

export function getsharedDocument(userData) {
  return (dispatch) => {
    dispatch(gettingUserDocs());
    console.log('asdkjksak');
    const url = '/api/documents?role=' + userData.role;
    return apiRequest(null, 'get', url, function(apiResult) {
      dispatch(getSharedDocSuccess(apiResult));
      return dispatch(getUserDocs(userData._id));
    });
  };
}

export function deleteDocAction(docId) {
  return (dispatch) => {
    const url = '/api/documents/' + docId;
    return apiRequest(null, 'delete', url, function(apiResult) {
      return dispatch(getComponentResources({}));
    });
  };
}

export function createDoc(docData, formObj) {
  return (dispatch) => {
    dispatch(savingDoc());
    const url = '/api/documents/';
    return apiRequest(docData, 'post', url, function(apiResult) {
      formObj.reset();
      dispatch(updateStoreWithNewDoc(apiResult));
    });
  };
}

export function getUserDocs(userId) {
  return (dispatch) => {
    dispatch(gettingUserDocs());
    const url = '/api/users/' + userId + '/documents';
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
    const url = '/api/users/getData';
    return apiRequest(null, 'get', url, function(apiResult) {
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
    console.log(userData);

    if (Object.keys(userData).length) {
      console.log('i came here');
      return dispatch(getsharedDocument(userData));
    }

    return dispatch(ValidateUser());
  };
}
