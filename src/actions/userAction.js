import * as actionTypes from './actionType.js';
import {apiRequest} from '../utils/apiRequest';

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
      displayLoader: '',
      userCreated: false
    }
  };
}

export function saveUserSuccess() {
  return {
    type: actionTypes.SAVE_USER_SUCCESS,
    data: {
      displayLoader: 'hide-element',
      userCreated: true
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
      userData: loginResult
    }
  };
}

export function activateSubmit() {
  return {
    type: actionTypes.ACTIVATE_SUBMIT_BUTTON,
    data: {
      editFormState: false
    }
  };
}

export function userUpdataSuccess(newUserData) {
  return {
    type: actionTypes.UPDATED_USER_DATA,
    data: {
      editPreLoader: true,
      userData: newUserData.user,
      feedBack: 'Updated!!!',
      displayFeedBack: 'block',
      feedBackColor: '#26a69a'
    }
  };
}

export function userUpdateFailed() {
  return {
    type: actionTypes.UPDATE_FAILED,
    data: {
      editPreLoader: true,
      feedBack: 'Oops!!! An error occured.',
      displayFeedBack: 'block',
      feedBackColor: '#dd0404'
    }
  };
}

export function updatingUserData() {
  return {
    type: actionTypes.UPDATING_USER_DATA,
    data: {
      editPreLoader: false
    }
  };
}

export function updatedUserData(newUserData) {
  return (dispatch) => {
    if (newUserData.user) {
      return dispatch(userUpdataSuccess(newUserData));
    }

    return dispatch(userUpdateFailed());
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

export function saveUserFailed() {
  return {
    type: actionTypes.CREATE_USER_FAILED,
    data: {
      createUserError: 'An error occured. Try again',
      displayLoader: 'hide-element'
    }
  }
}

export function checkLoginResult(loginData) {
  return (dispatch) => {
    if (loginData.message) {
      dispatch(loginFailed(loginData));
    }

    if (loginData.result.token) {
      window.localStorage.setItem('token', loginData.result.token);
      dispatch(loginSuccess(loginData.result.userData));
    }
  };
}

export function updateUserData(newUserData, id) {
  return (dispatch) => {
    dispatch(updatingUserData());
    const url = '/api/users/' + id;
    return apiRequest(newUserData, 'put', url, function (apiResult) {
      dispatch(updatedUserData(apiResult));
    });
  };
}

export function saveUserData(user) {
  return (dispatch) => {
    dispatch(savingUser());
    const url = '/api/users/';
    return apiRequest(user, 'post', url, function (apiResult) {
      dispatch(createUser(apiResult));
      if (apiResult.success) {
        return dispatch(saveUserSuccess());
      }
      
      return dispatch(saveUserFailed());
    });
  };
}

export function loginUser(userData) {
  return (dispatch) => {
    dispatch(checkingUser());
    const url = '/api/users/login';
    return apiRequest(userData, 'post', url, function (apiResult) {
      dispatch(checkLoginResult(apiResult));
    });
  };
}
