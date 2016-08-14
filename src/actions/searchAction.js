import * as actionTypes from "./actionType";
import {apiRequest} from "../utils/apiRequest";

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
      console.log(apiResult, 'checkin api result');
      dispatch(searchCompleted(searchTerm, apiResult));
    });
  };
}
