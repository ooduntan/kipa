import expect from 'expect';
import * as actionTypes from '../../actions/actionType';
import * as userActions from '../../actions/userAction';

describe('User actions', () => {
  const userData = {id: 1, username: 'Stephen', password: 'Odunnnnnta'};

  it('Should create a CREATE_USER action', () => {
    const expectedResult = {
      type: actionTypes.CREATE_USER,
      data: userData
    };
    const action = userActions.createUser(userData);
    
    expect(action).toEqual(expectedResult);
  });

  it('Should display an element by changing it style', () => {
    const expectedResult = {
      type: actionTypes.SAVING_USER,
      data: {
        displayLoader: 'block'
      }
    };
    const action = userActions.savingUser();

    expect(action).toEqual(expectedResult);
  });

  it('Should hide an element by changing is display style to none', () => {
    const expectedResult = {
      type: actionTypes.SAVE_USER_SUCCESS,
      data: {
        displayLoader: 'none'
      }
    };
    const action = userActions.saveUserSuccess(userData);

    expect(action).toEqual(expectedResult);
  });

  it('Should return a displayLoader with an empty string', () => {
    const expectedResult = {
      type: actionTypes.CHECKING_USER,
      data: {
        displayLoader: ''
      }
    };
    const action = userActions.checkingUser();

    expect(action).toEqual(expectedResult);
  });

  it('Should redirect a user and save user data in the store', () => {
    const expectedResult = {
      type: actionTypes.LOGIN_SUCCESS,
      data: {
        displayLoader: 'hide-element',
        shouldRedirect: true,
        userData: userData
      }
    };
    const action = userActions.loginSuccess(userData);

    expect(action).toEqual(expectedResult);
  });

  it('Should change the edit form state to activate submit button', () => {
    const expectedResult = {
      type: actionTypes.ACTIVATE_SUBMIT_BUTTON,
      data: {
        editFormState: false
      }
    };
    const action = userActions.activateSubmit();

    expect(action).toEqual(expectedResult);
  });

  it('Should change the edit form state to activate submit button', () => {
    const newUserData = {user: userData};
    const expectedResult = {
      type: actionTypes.UPDATED_USER_DATA,
      data: {
        editPreLoader: true,
        userData: userData,
        feedBack: 'Updated!!!',
        displayFeedBack: 'block',
        feedBackColor: '#26a69a'
      }
    };
    const action = userActions.userUpdataSuccess(newUserData);

    expect(action).toEqual(expectedResult);
  });

  it('Should update the store with the error type when user update fails', () => {
    const expectedResult = {
      type: actionTypes.UPDATE_FAILED,
      data: {
        editPreLoader: true,
        feedBack: 'Oops!!! An error occured.',
        displayFeedBack: 'block',
        feedBackColor: '#dd0404'
      }
    };
    const action = userActions.userUpdateFailed();

    expect(action).toEqual(expectedResult);
  });

  it('Should display preloader when update is in progress', () => {
    const expectedResult = {
      type: actionTypes.UPDATING_USER_DATA,
      data: {
        editPreLoader: false
      }
    };
    const action = userActions.updatingUserData();

    expect(action).toEqual(expectedResult);
  });

  it('Should return an object to contains the error message', () => {
    const loginResult = {message: 'Username  and password not correct'};
    const expectedResult = {
      type: actionTypes.LOGIN_FAIL,
      data: {
        error: loginResult.message,
        displayLoader: 'hide-element'
      }
    };
    const action = userActions.loginFailed(loginResult);

    expect(action).toEqual(expectedResult);
  });
});