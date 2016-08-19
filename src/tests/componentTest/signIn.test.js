import expect from 'expect';
import '../testUtils/localStorage';
import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import {SignInComponent} from '../../components/home/signInComponent';

const props = {
  stateProp: {
    userState: {
      user: {
        error: '',
        displayLoader: 'hide-element'
      }
    },
    roles: {
      roles: []
    }
  },
  toggleSignUp: function () {
    return;
  },
  userActions: {
    loginUser: function (userData) {
      return userData;
    }
  }
};

describe('Test the sign in page', () => {
  let signInComponent;

  beforeEach(() => {
    signInComponent = mount(<SignInComponent {...props}/>);
  });

  it('Should only render two input', () => {
    expect(signInComponent.find('input').length).toBe(2);
  });

  it('Should only render one button', () => {
    expect(signInComponent.find('button').length).toBe(1);
    expect(signInComponent.find('button').text()).toBe('SIGN IN');
  });

  it('Should only render one link for sign up', () => {
    expect(signInComponent.find('a').length).toBe(1);
    expect(signInComponent.find('a').text()).toBe('New user? Sign up')
  });

  it('Should update the onput state when filled', () => {
    signInComponent.find('#username').simulate('change', {target: {value: 'tobolowoski', name: 'username'}});
    signInComponent.find('#password').simulate('change', {target: {value: '123456', name: 'password'}});
    expect(signInComponent.state().loginData.username).toBe('tobolowoski');
    expect(signInComponent.state().loginData.password).toBe('123456');
  });

  it('Should call a login function when the login form is filled', () => {
    let submitSpy = spy(props.userActions, 'loginUser');
    signInComponent.find('#username').simulate('change', {target: {value: 'tobolowoski', name: 'username'}});
    signInComponent.find('#password').simulate('change', {target: {value: '123456', name: 'password'}});
    signInComponent.find('form').simulate('submit');
    expect(submitSpy.called).toBe(true);
    submitSpy.restore();
  });

});