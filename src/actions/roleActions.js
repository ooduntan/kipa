import  * as actionTypes from './actionType';
import {apiRequest} from '../utils/apiRequest';

export function getDocsSuccess(rolesData) {
  return {
    type: actionTypes.FETCH_ROLES_SUCCESS,
    data: rolesData
  };
}

export function getRoles() {
  return (dispatch) => {
    const url = '/api/role';
    apiRequest(null, 'get', url, (apiResult) => {
       dispatch(getDocsSuccess(apiResult));
    });
  };
}
