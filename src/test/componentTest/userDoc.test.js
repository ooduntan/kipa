import expect from "expect";
import "../testUtils/localStorage";
import React from "react";
import {mount} from "enzyme";
import {spy} from "sinon";
import {OwnDocument} from "../../components/userPage/ownedDocs";

const props = {
  changeHandler: function () {
    return;
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
  let ownDocument;

  beforeEach(() => {
    ownDocument = mount(<OwnDocument {...props}/>);
  });

  it('Should render four inputs', () => {
    expect(ownDocument.find('input').length).toBe(4);
    expect(ownDocument.find('textarea').length).toBe(1);
  });

  it('Should render one button', () => {
    expect(ownDocument.find('button').length).toBe(1);
    expect(ownDocument.find('button').text()).toBe('Create');
  });

  it('Should render one form element', () => {
    expect(ownDocument.find('form').length).toBe(1);
  });

  it('Should contain a search input', () => {
    ownDocument.find('#search').simulate('change', {target: {value: 'A test document', name: 'search'}});
  });

  it('Should contain the correct header title', () => {
    expect(ownDocument.find('.headerClass').text()).toBe('My Documents');
  });

  it('Should contain a FAB icon', () => {
    expect(ownDocument.find('.btn-floating').length).toBe(1);
    expect(ownDocument.find('.btn-floating').text()).toBe('add');
    ownDocument.find('.btn-floating').simulate('click');
  });

  it('Should not contain document card ', () => {
    expect(ownDocument.find('.card').length).toBe(0);
  });

});