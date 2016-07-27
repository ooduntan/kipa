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

export function loginSuccess(loginResult) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    data: {
      shouldRedirect: true,
      displayLoader: 'hide-element',
      userData: loginResult.result.userData
    }
  };
}

export function loginFailed(loginResult) {
  return {
    type: actionTypes.LOGIN_FAIL,
    data: {
      error: loginResult.message,
      displayLoader: 'hide-element'
    }
  };
}

export function checkLoginResult(loginData) {
  return (dispatch) => {
    if (loginData.message) {
      dispatch(loginFailed(loginData));
    }

    if (loginData.result.token) {
      window.localStorage.setItem('token', loginData.result.token);
      dispatch(loginSuccess(loginData));
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
    return api.apiRequest(userData, 'post', url, function(apiResult) {
      dispatch(checkLoginResult(apiResult));
    });
  };
}
