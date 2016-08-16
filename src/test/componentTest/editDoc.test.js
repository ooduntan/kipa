import expect from 'expect';
import '../testUtils/localStorage';
import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import {EditDocument} from '../../components/userPage/editDocument';

const props = {
  documentActions: {
    updatePageWithEditData: function () {
      return;
    },
    upadateDocument: function (userData) {
      return userData;
    }
  },
  params: {
    id: 1
  },
  stateProp: {
    userState: {
      userData: {}
    },
    userDocs: {
      editDocumentData: {
        access: ['1'],
        title: 'This is the title',
        content: 'This is the content'
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

describe('Test the Edit document in page', () => {
  let editDocument;
  let updatePageSyp = spy(props.documentActions, 'updatePageWithEditData');


  beforeEach(() => {
    editDocument = mount(<EditDocument {...props}/>);
  });

  it('Should call updatePageWithEditData function to update ' +
    'input with current data before rendering page', () => {
    expect(updatePageSyp.callCount).toBe(1);
  });

  it('Should render four inputs', () => {
    expect(editDocument.find('input').length).toBe(4);
    expect(editDocument.find('[type="checkbox"]').length).toBe(2);
  });

  it('Should render one button', () => {
    expect(editDocument.find('button').length).toBe(1);
    expect(editDocument.find('button').text()).toBe('Update');
  });

  it('Should render one form element', () => {
    expect(editDocument.find('form').length).toBe(1);
  });

  it('Should contain a search input', () => {
    editDocument.find('#search').simulate('change', {target: {value: 'A test document', name: 'search'}});
  });

  it('Should contain the correct header title', () => {
    expect(editDocument.find('.headerClass').text()).toBe('Edit Document');
  });

  it('Should not contain a FAB icon', () => {
    expect(editDocument.find('.btn-floating').length).toBe(0);
  });

  it('Should not contain document card ', () => {
    expect(editDocument.find('.card').length).toBe(0);
  });

  it('Should fill the form with the selected document data', () => {
    expect(editDocument.find('#title').get(0).value).toBe('This is the title');
    expect(editDocument.find('textarea').get(0).value).toBe('This is the content');
    expect(editDocument.find('[type="checkbox"]').at(1).props().defaultChecked).toBe(false);
    expect(editDocument.find('[type="checkbox"]').at(0).props().defaultChecked).toBe('checked');
  });

  it('Should update a state with input values', () => {
    editDocument.find('#title').simulate('change', {target: {value: 'I change the title', name: 'title'}});

    expect(editDocument.state().title).toBe('I change the title');
    expect(editDocument.state().content).toBe('This is the content');
    expect(editDocument.state().access).toEqual(['1']);
  });

  it('Should submit form when eidted', () => {
    let updateActionSpy = spy(props.documentActions, 'upadateDocument');
    editDocument.find('#title').simulate('change', {target: {value: 'I change the title', name: 'title'}});
    editDocument.find('form').simulate('submit');
    expect(updateActionSpy.callCount).toBe(1);
    updateActionSpy.restore();
  });
});