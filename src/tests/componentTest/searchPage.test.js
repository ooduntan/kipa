import expect from 'expect';
import '../testUtils/localStorage';
import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import {Search} from '../../components/userPage/search';

const props = {
  changeHandler: function () {
    return;
  },
  location: {
    query: {
      q: 'Search Word'
    }
  },
  stateProp: {
    userState: {
      userData: {}
    },
    userDocs: {
      deleteDoc: {
        _id: '',
        title: '',
        content: ''
      },
      search: [{
        _id: 1,
        title: 'new dumb title',
        content: 'Test content',
        updatedAt: '',
        createdAt: '',
        access: [1],
        creator: {username: 'Heavywater'}
      }],
      docs: []
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
        }
      ]
    }
  }
};

describe('Test the sign in page', () => {
  let search;

  beforeEach(() => {
    search = mount(<Search {...props}/>);
  });

  it('Should render only search inputs', () => {
    expect(search.find('input').length).toBe(1);
    expect(search.find('textarea').length).toBe(0);
    expect(search.find('button').length).toBe(0);

  });

  it('Should contain a search input', () => {
    search.find('#search').simulate('change', {target: {value: 'A test document', name: 'search'}});
  });

  it('Should contain the correct header title', () => {
    expect(search.find('.headerClass').text()).toBe('Found 1 Result(s) for Search Word');
  });

  it('Should not have FAB icon', () => {
    expect(search.find('.btn-floating').length).toBe(0);
  });

  it('Should contain document data ', () => {
    expect(search.find('.card').length).toBe(1);
    expect(search.find('.card-title').at(0).text()).toBe('new dumb title');
    expect(search.find('.card-title').at(1).text()).toBe('new dumb titleclose');
    expect(search.find('.card-action').props().children.length).toBe(2);
    expect(search.find('.card-reveal').props().children.length).toBe(2);
  });

});