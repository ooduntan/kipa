import expect from "expect";
import "../testUtils/localStorage";
import React from "react";
import {mount} from "enzyme";
import SignInForm from "../../components/home/signUpForm";
import {spy} from "sinon";
import {SignUpComponent} from "../../components/home/signUpComponent";

const props = {
  userState: {
    displayLoader: 'hide-element',
    success: false
  },
  roles: []
};

describe('Test the signUp form component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SignInForm {...props}/>);
  });

  it('Should check if the form renders all the inputs', () => {
    expect(wrapper.find('input').length).toBe(6);
    expect(wrapper.find('select').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('Should be a stateless component', () => {
    wrapper.find('button').simulate('click');
    expect(wrapper.state()).toBe(null);
  });

});

describe('Test the sign in functions', () => {
  const prop2 = {
    stateProp: {
      userState: {
        displayLoader: 'hide-element',
        success: false
      },
      roles: {roles: []}
    },
    userActions: {
      saveUserData: function (userData) {
        return userData;
      }
    }
  };
  let signUpComponent;
  beforeEach(() => {
    signUpComponent = mount(<SignUpComponent {...prop2}/>);
    signUpComponent.find('button').simulate('click');
  });

  it('Should have the correct state when rendered for the first time', () => {
    signUpComponent.find('button').simulate('click');
    expect(signUpComponent.state().confirmPasswordError).toBe(false);
    expect(signUpComponent.state().emailError).toBe(false);
    expect(signUpComponent.state().passwordError).toBe(false);
    expect(signUpComponent.state().submitResult).toBe(false);
    expect(signUpComponent.state().user).toEqual({});
  });

  it('Should change state when user eidt form', () => {
    signUpComponent.find('#username').simulate('change', {target: {value: 'Oluwatobilob', name: 'username'}});
    expect(signUpComponent.state().user.username).toBe('Oluwatobilob');
    signUpComponent.find('#first_name').simulate('change', {target: {value: 'Stephen', name: 'firstname'}});
    expect(signUpComponent.state().user.firstname).toBe('Stephen');
    signUpComponent.find('#last_name').simulate('change', {target: {value: 'Oduntan', name: 'lastname'}});
    expect(signUpComponent.state().user.lastname).toBe('Oduntan');
    signUpComponent.find('#email').simulate('change', {target: {value: 'steven.andelagamil.com', name: 'email'}});
    expect(signUpComponent.state().user.email).toBe('steven.andelagamil.com');
    signUpComponent.find('#password').simulate('change', {target: {value: 'xxxxx', name: 'password'}});
    expect(signUpComponent.state().user.password).toBe('xxxxx');
    signUpComponent.find('#confirm-password').simulate('change', {target: {value: 'xxxxxx', name: 'confirmPassword'}});
    expect(signUpComponent.state().user.confirmPassword).toBe('xxxxxx');

  });

  it('SHould not allow user with an invalid email address', () => {
    let saveSpy = spy(prop2.userActions, 'saveUserData');
    signUpComponent.find('#email').simulate('keyUp', {target: {value: 'stegeb@jd', name: 'email'}});
    signUpComponent.find('form').simulate('submit');
    expect(signUpComponent.state().emailError).toBe(true);
    expect(saveSpy.callCount).toBe(0);
    saveSpy.restore();
  });

  it('Should not create user with password less than six characters', () => {
    let saveSpy = spy(prop2.userActions, 'saveUserData');
    signUpComponent.find('#password').simulate('keyUp', {target: {value: '@jdk', name: 'password'}});
    signUpComponent.find('form').simulate('submit');
    expect(signUpComponent.state().passwordError).toBe(true);
    expect(saveSpy.callCount).toBe(0);
    saveSpy.restore();
  });

  it('Should create user with password than six characters', () => {
    signUpComponent.find('#password').simulate('keyUp', {target: {value: 'mmssdss', name: 'password'}});
    signUpComponent.find('form').simulate('submit');
    expect(signUpComponent.state().passwordError).toBe(false);
  });

  it('SHould not create user with mismatched password', () => {
    signUpComponent.find('#password').simulate('change', {target: {value: '@jdk', name: 'password'}});
    signUpComponent.find('#confirm-password').simulate('keyUp', {target: {value: '@jdk', name: 'confirmPassword'}});
    signUpComponent.find('form').simulate('submit');
    expect(signUpComponent.state().confirmPasswordError).toBe(true);
  });

  it('Should not submit form if not filled correctly', () => {
    signUpComponent.find('#username').simulate('change', {target: {value: 'tobolowoski', name: 'username'}});
    signUpComponent.find('#password').simulate('keyUp', {target: {value: '@jdk', name: 'password'}});
    signUpComponent.find('#password').simulate('change', {target: {value: '@jdk', name: 'password'}});
    signUpComponent.find('#first_name').simulate('change', {target: {value: 'Oduntan', name: 'firstname'}});
    signUpComponent.find('#last_name').simulate('change', {target: {value: 'Oluwatobiloba', name: 'lastname'}});
    signUpComponent.find('#email').simulate('change', {target: {value: 'stephen@ng,com', name: 'email'}});
    signUpComponent.find('#email').simulate('keyUp', {target: {value: 'stephen@ng,com', name: 'email'}});
    signUpComponent.find('#confirm-password').simulate('change', {target: {value: '@jdk', name: 'confirmPassword'}});
    signUpComponent.find('#confirm-password').simulate('keyUp', {target: {value: '@jdk', name: 'confirmPassword'}});
    signUpComponent.find('form').simulate('submit');
    expect(signUpComponent.state().confirmPasswordError).toBe(false);
    expect(signUpComponent.state().emailError).toBe(true);
    expect(signUpComponent.state().passwordError).toBe(true);
  });

  it('Should submit form if correctly filled', () => {
    let saveSpy = spy(prop2.userActions, 'saveUserData');
    signUpComponent.find('#username').simulate('change', {target: {value: 'tobolowoski', name: 'username'}});
    signUpComponent.find('#password').simulate('keyUp', {target: {value: 'ynynynyn', name: 'password'}});
    signUpComponent.find('#password').simulate('change', {target: {value: 'ynynynyn', name: 'password'}});
    signUpComponent.find('#first_name').simulate('change', {target: {value: 'Oduntan', name: 'firstname'}});
    signUpComponent.find('#last_name').simulate('change', {target: {value: 'Oluwatobiloba', name: 'lastname'}});
    signUpComponent.find('#email').simulate('change', {target: {value: 'stephen@gmail.com', name: 'email'}});
    signUpComponent.find('#email').simulate('keyUp', {target: {value: 'stephen@gmail.com', name: 'email'}});
    signUpComponent.find('#confirm-password').simulate('change', {
      target: {
        value: 'ynynynyn',
        name: 'confirmPassword'
      }
    });
    signUpComponent.find('#confirm-password').simulate('keyUp', {target: {value: 'ynynynyn', name: 'confirmPassword'}});
    signUpComponent.find('form').simulate('submit');
    expect(signUpComponent.state().confirmPasswordError).toBe(false);
    expect(signUpComponent.state().emailError).toBe(false);
    expect(signUpComponent.state().passwordError).toBe(false);
    expect(saveSpy.called).toBe(true);
    saveSpy.restore();
  });
});