import expect from 'expect';
import '../testUtils/localStorage';
import {testContext} from '../testUtils/contextMock';
import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import {SharedDocs} from '../../components/userPage/sharedDocs';

const props = {
  documentActions: {
    editDocSuccess: function () {
      return;
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
      docs: [],
      sharedDocs: {
        doc: []
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
        }
      ]
    }
  }
};

describe('Shared document page', () => {
  let sharedDocs;

  beforeEach(() => {
    sharedDocs = mount(<SharedDocs {...props}/>, testContext);
  });

  it('Should render four inputs', () => {
    expect(sharedDocs.find('input').length).toBe(4);
    expect(sharedDocs.find('textarea').length).toBe(1);
  });

  it('Should render one button', () => {
    expect(sharedDocs.find('button').length).toBe(1);
    expect(sharedDocs.find('button').text()).toBe('Create');
  });

  it('Should render one form element', () => {
    expect(sharedDocs.find('form').length).toBe(1);
  });

  it('Should contain a search input', () => {
    sharedDocs.find('#search').simulate('change', {target: {value: 'A test document', name: 'search'}});
  });

  it('Should contain the correct header title', () => {
    expect(sharedDocs.find('.headerClass').text()).toBe('Shared Documents');
  });

  it('Should contain a FAB icon', () => {
    expect(sharedDocs.find('.btn-floating').length).toBe(1);
    expect(sharedDocs.find('.btn-floating').text()).toBe('add');
    sharedDocs.find('.btn-floating').simulate('click');
  });

  it('Should not contain document card ', () => {
    expect(sharedDocs.find('.card').length).toBe(0);
  });

});