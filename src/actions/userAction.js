'use strict';

import * as actionTypes from './actionType.js';
import * as api from '../utils/apiRequest';

export function createUser(user) {
  return {
    type: actionTypes.CREATE_USER,
    data: user
  };
}

export function savingUser() {
  return {
    type: actionTypes.SAVING_USER,
    data: {
      displayLoader: 'block'
    }
  };
}

export function saveUserSuccess() {
  return {
    type: actionTypes.SAVE_USER_SUCCESS,
    data: {
      displayLoader: 'none'
    }
  };
}

export function checkingUser() {
  return {
    type: actionTypes.CHECKING_USER,
    data: {
      displayLoader: ''
    }
  };
}

export function checkLoginResult(loginResult) {
  if (loginResult.result.token) {
    window.localStorage.setItem('token', loginResult.result.token);
    return {
      type: actionTypes.LOGIN_SUCCESS,
      data: {
        error: '',
        shouldRedirect: true,
        displayLoader: 'hide-element',
        userData: loginResult.result.userData
      }
    };
  }

  return {
    type: actionTypes.LOGIN_FAIL,
    data: {
      error: loginResult.message,
      displayLoader: 'hide-element'
    }
  };
}

export function saveUserData(user) {
  return (dispatch) => {
    dispatch(savingUser());
    const url = '/api/users/';
    return api.postRequest(user, url, null, function(apiResult) {
      dispatch(createUser(apiResult));
      dispatch(saveUserSuccess());
    });
  };
}

export function loginUser(userData) {
  return (dispatch) => {
    dispatch(checkingUser());
    const url = '/api/users/login';
     api.apiRequest(userData, 'post', url, function(apiResult) {
      dispatch(checkLoginResult(apiResult));
    });
  };
}
