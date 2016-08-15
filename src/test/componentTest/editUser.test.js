import expect from "expect";
import "../testUtils/localStorage";
import React from "react";
import {mount} from "enzyme";
import {spy} from "sinon";
import {EditUserComponent} from "../../components/userPage/editUserDataPage";

const props = {
  userActions: {
    activateSubmit: function () {
      return;
    },
    updateUserData: function (userData) {
      return userData;
    }
  },
  stateProp: {
    userState: {
      userData: {
        _id: 1,
        email: 'stephen.oduntn@andela.com',
        name: {
          firstname: 'Oluwatobiloba',
          lastname: 'Oduntan'
        },
        password: '$2a$10$bSQ7wkCMKOOKZJaE2vSAB.X2/Z3kcRfVYq8jQ2DGMfKJIZzLlhsia',
        role: {
          _id: 1,
          role: 'Fellow'
        },
        username: 'tobolowoski'
      }
    },
    roles: {
      roles: [
        {
          _id: 1,
          role: 'Fellow'
        },
        {
          _id: 2,
          role: 'Trainer'
        },
        {
          _id: 3,
          role: 'Investor'
        }
      ]
    }
  }
};

describe('Test edit user data page', () => {
  let editUserComponent;

  beforeEach(() => {
    editUserComponent = mount(<EditUserComponent {...props}/>);
  });

  it('Should render five inputs', () => {
    expect(editUserComponent.find('input').length).toBe(5);
    expect(editUserComponent.find('select').length).toBe(1);
  });

  it('Should render one button', () => {
    expect(editUserComponent.find('button').length).toBe(1);
    expect(editUserComponent.find('button').text()).toBe('Update');
  });

  it('Should render one form element', () => {
    expect(editUserComponent.find('form').length).toBe(1);
  });

  it('Should contain a search input', () => {
    editUserComponent.find('#search').simulate('change', {target: {value: 'A test document', name: 'search'}});
  });

  it('Should contain the correct header title', () => {
    expect(editUserComponent.find('.headerClass').text()).toBe('Edit Profile');
  });

  it('Should not contain a FAB icon', () => {
    expect(editUserComponent.find('.btn-floating').length).toBe(0);
  });

  it('Should not contain document card ', () => {
    expect(editUserComponent.find('.card').length).toBe(0);
  });

  it('Should fill the form with current user data', () => {
    expect(editUserComponent.find('#username').get(0).value).toBe('tobolowoski');
    expect(editUserComponent.find('#firstname').get(0).value).toBe('Oluwatobiloba');
    expect(editUserComponent.find('#lastname').get(0).value).toBe('Oduntan');
    expect(editUserComponent.find('#email').get(0).value).toBe('stephen.oduntn@andela.com');
    expect(editUserComponent.find('select').props().children[1].props.selected).toBe('selected');
    expect(editUserComponent.find('select').props().children[1].props.value).toBe('Fellow');
  });

  it('Should enable submit button if any field chnaged', () => {
    let buttonSpy = spy(props.userActions, 'activateSubmit');
    editUserComponent.find('#username').simulate('change', {target: {value: 'sheyoo', name: 'username'}});
    expect(buttonSpy.called).toBe(true);
    buttonSpy.restore();
  });

  it('Should update a state with input values', () => {
    editUserComponent.find('#lastname').simulate('change', {target: {value: 'Seyi', name: 'lastname'}});
    editUserComponent.find('#firstname').simulate('change', {target: {value: 'Adekoya', name: 'firstname'}});
    editUserComponent.find('#username').simulate('change', {target: {value: 'Sheyoo', name: 'username'}});
    editUserComponent.find('#email').simulate('change', {target: {value: 'seyi.adekoya@andela.com', name: 'email'}});
    editUserComponent.find('select').simulate('change', {target: {value: 'Investor', name: 'role'}});

    expect(editUserComponent.state().userData.firstname).toBe('Adekoya');
    expect(editUserComponent.state().userData.lastname).toBe('Seyi');
    expect(editUserComponent.state().userData.username).toBe('Sheyoo');
    expect(editUserComponent.state().userData.email).toBe('seyi.adekoya@andela.com');
    expect(editUserComponent.state().userData.role).toBe('Investor');
  });

  it('Should submit form when eidted', () => {
    let updateActionSpy = spy(props.userActions, 'updateUserData');
    editUserComponent.find('#lastname').simulate('change', {target: {value: 'Seyi', name: 'lastname'}});
    editUserComponent.find('form').simulate('submit');
    expect(updateActionSpy.callCount).toBe(1);
  });
});