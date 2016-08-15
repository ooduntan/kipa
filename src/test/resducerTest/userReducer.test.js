import expect from "expect";
import * as userActions from "../../actions/userAction";
import userReducer from "../../reducers/userReducer";

describe('User reducer test', () => {
  const initialState = {
    user: {},
    docs: [],
    sharedDocs: []
  };

  it('Should update the user property in the store', () => {
    const userData = {name: 'stephen', email: 'ehi@jdhjd.odj'};
    const action = userActions.createUser(userData);
    const newState = userReducer(initialState, action);

    expect(newState.email).toEqual(userData.email);
    expect(newState.name).toEqual(userData.name);
  });

  it('Should update the loader property in the store', () => {
    const action = userActions.savingUser();
    const newState = userReducer(initialState, action);

    expect(newState.displayLoader).toEqual('block');
  });

  it('Should update the loader property in the store', () => {
    const action = userActions.saveUserSuccess();
    const newState = userReducer(initialState, action);

    expect(newState.displayLoader).toEqual('none');
  });

  it('Should update the loader property in the store', () => {
    const action = userActions.checkingUser();
    const newState = userReducer(initialState, action);

    expect(newState.displayLoader).toEqual('');
  });

  it('Should update the loader property in the store', () => {
    const action = userActions.updatingUserData();
    const newState = userReducer(initialState, action);

    expect(newState.editPreLoader).toEqual(false);
  });

  it('Should update the store with login status', () => {
    const errorMessage = {message: 'An error occurred!'}
    const action = userActions.loginFailed(errorMessage);
    const newState = userReducer(initialState, action);

    expect(newState.displayLoader).toEqual('hide-element');
    expect(newState.error).toEqual(errorMessage.message);
  });

  it('Should update the store with login status', () => {
    const userData = {name: 'stephen', email: 'ehi@jdhjd.odj'};
    const action = userActions.loginSuccess(userData);
    const newState = userReducer(initialState, action);

    expect(newState.displayLoader).toEqual('hide-element');
    expect(newState.shouldRedirect).toEqual(true);
    expect(newState.userData).toEqual(userData);
  });

  it('Should update the store with login status', () => {
    const userData = {
      user: {
        name: 'stephen',
        email: 'ehi@jdhjd.odj'
      }
    };
    const action = userActions.userUpdataSuccess(userData);
    const newState = userReducer(initialState, action);

    expect(newState.editPreLoader).toEqual(true);
    expect(newState.feedBack).toEqual('Updated!!!');
    expect(newState.displayFeedBack).toEqual('block');
    expect(newState.userData).toEqual(userData.user);
  });
});

