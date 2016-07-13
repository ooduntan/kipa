import * as actionTypes from './actionType.js';
import * as api from '../utils/apiRequest';

export function createUser(user) {
  return {
    type: actionTypes.CREATE_USER,
    data: user
  };
}

export function savingUser(formState) {
  return {
    type: actionTypes.SAVING_USER,
    data: {displayLoader: 'block'}
  };
}

export function saveUserSuccess() {
  return {
    type: actionTypes.SAVE_USER_SUCCESS,
    data: {displayLoader: 'none'}
  };
}

export function saveUserData(user) {
  return (dispatch) => {
    dispatch(savingUser());
    const url = '/api/users/';
    return api.postRequest(user, url, function(apiResult) {
      dispatch(createUser(apiResult));
      dispatch(saveUserSuccess());
    });
  }
};
