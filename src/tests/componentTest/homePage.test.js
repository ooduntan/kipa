import expect from 'expect';
import '../testUtils/localStorage';
import React from 'react';
import {mount} from 'enzyme';
import {Homepage} from '../../components/home/homePage';
const props = {
  signInEvent: function () {
    return;
  },
  stateProp: {
    userState: {},
    roles: {
      roles: []
    }
  },
  status: true
};

describe('Test home page component', () => {
  it('Should check if the homepage is loaded', () => {
    const wrapper = mount(<Homepage {...props}/>);
    expect(wrapper.find('.logo-name').text()).toBe('Kipa');
  });

  it('Should not have search field if user not logged in', () => {
    const wrapper = mount(<Homepage {...props}/>);
    expect(wrapper.find('.search').length).toBe(0);
  });

  it('Should have the two forms', () => {
    const wrapper = mount(<Homepage {...props}/>);
    expect(wrapper.find('form').length).toBe(2);
  });

  it('Should have the all the necessary input', () => {
    const wrapper = mount(<Homepage {...props}/>);
    expect(wrapper.find('input').length).toBe(8);
  });

  it('Should have two buttons', () => {
    const wrapper = mount(<Homepage {...props}/>);
    expect(wrapper.find('button').length).toBe(2);
  });
});
