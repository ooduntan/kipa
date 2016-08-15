import expect from "expect";
import "../testUtils/localStorage";
import React from "react";
import {mount} from "enzyme";
import {spy} from "sinon";
import SideNav from "../../components/userPage/sideNav";

const props = {
  userData: {
    name: {
      firstname: 'Oluwatobi',
      lastname: 'Oduntan'
    },
    username: 'tobolowoski',
    role: {
      role: 'Fellow'
    },
    email: 'stephen@gmail.com'
  }
};

describe('Test the sign in page', () => {
  let sideNav;

  beforeEach(() => {
    sideNav = mount(<SideNav {...props}/>);
  });

  it('Should have three menu links', () => {
    expect(sideNav.find('a').length).toBe(3);
  });

  it('Menu should have expected icon and title', () => {
    expect(sideNav.find('a').first().text()).toBe('descriptionMy Documents');
    expect(sideNav.find('a').at(1).text()).toBe('group_workShared Documents');
    expect(sideNav.find('a').last().text()).toBe('mode_editEdit Profile');
  });

  it('User data must be equal to the prop that was sent to the component', () => {
    expect(sideNav.find('.username-text').text()).toBe('Oduntan, Oluwatobi');
    expect(sideNav.find('.username-text').text()).toBe('Oduntan, Oluwatobi');
    expect(sideNav.find('div.center-align').at(2).text()).toBe('Fellow');
    expect(sideNav.find('div.center-align').at(1).text()).toBe('tobolowoski');
    expect(sideNav.find('div.center-align').at(3).text()).toBe('stephen@gmail.com');
  });
});