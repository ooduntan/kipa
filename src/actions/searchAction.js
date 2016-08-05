import  * as actionTypes from './actionType';
import {apiRequest} from '../utils/apiRequest';

export function searchingDocument() {
  return {
    type: actionTypes.SEARCHING_DOCUMENT,
    data: {docSuccess: false}
  };
}

export function searchCompleted(searchResult) {
  return {
    type: actionTypes.SEARCH_COMPLETED,
    data: {
      search: searchResult.doc,
      docSuccess: true
    }
  };
}

export function searchDocument(searchTerm, userRole) {
  return (dispatch) => {
    dispatch(searchingDocument());
    const url = '/api/documents?q=' + searchTerm + '&role=' + userRole;
    apiRequest(null, 'get', url, (apiResult) => {
      console.log(apiResult);
       dispatch(searchCompleted(apiResult));
    });
  };
}
