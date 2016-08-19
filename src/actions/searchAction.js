import * as actionTypes from './actionType';
import {apiRequest} from '../utils/apiRequest';

export function searchCompleted(searchTerm, searchResult) {
  return {
    type: actionTypes.SEARCH_COMPLETED,
    data: {
      updateSearch: false,
      refreshed: false,
      search: searchResult.doc,
      searchTerm: searchTerm
    }
  };
}

export function searchDocument(searchTerm, userRole) {
  return (dispatch) => {
    const url = '/api/documents?q=' + searchTerm + '&role=' + userRole;

    apiRequest(null, 'get', url, (apiResult) => {
      dispatch(searchCompleted(searchTerm, apiResult));
    });
  };
}

export function addingMoreDocToStore() {
  return {
    type: actionTypes.ADDING_MORE_DOC_TO_STORE,
    data: {lazyLoading: true}
  };
}

export function updatedStoreWithSearchedDocs(newDocs) {
  return {
    type: actionTypes.ADD_MORE_SHARED_DOCS,
    data: {
      docs: newDocs.doc,
      lazyLoading: false
    }
  };
}

export function addMoreSearchResult(exisitingDocs, userRole, searchTerm) {
  return (dispatch) => {
    dispatch(addingMoreDocToStore());
    const url = '/api/documents?q=' + searchTerm + '&role=' +
      userRole + 'offset=' + exisitingDocs;
    return apiRequest(null, 'get', url, function (apiResult) {
      return dispatch(updatedStoreWithSearchedDocs(apiResult));
    });
  };
}
