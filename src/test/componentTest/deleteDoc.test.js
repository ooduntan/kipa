import expect from "expect";
import "../testUtils/localStorage";
import React from "react";
import {mount} from "enzyme";
import {spy} from "sinon";
import DeleteModal from "../../components/userPage/deleteDoc";

const props = {
  docData: {
    _id: 1,
    title: 'new dumb title',
    content: 'Test content',
    updatedAt: '',
    createdAt: '',
    access: [1],
    creator: {username: 'Heavywater'}
  },
  deleteEvent: function () {
    console.log('ksjdkjfk ')
    return;
  }
};

describe('Test Delete document component', () => {
  let deleteModal;
  let deleteEventSpy = spy(props, 'deleteEvent');

  beforeEach(() => {
    deleteModal = mount(<DeleteModal {...props}/>);
  });

  it('Should render no inputs', () => {
    expect(deleteModal.find('input').length).toBe(0);
    expect(deleteModal.find('[type="checkbox"]').length).toBe(0);
  });

  it('Should render confirmation links', () => {
    expect(deleteModal.find('a').length).toBe(2);
    expect(deleteModal.find('a').at(0).text()).toBe('No');
    expect(deleteModal.find('a').at(1).text()).toBe('Yes');
  });

  it('Should call delete event', () => {
    expect(deleteModal.find('a').length).toBe(2);
    deleteModal.find('a').at(1).simulate('click');
    expect(deleteEventSpy.callCount).toBe(1);
  });

  it('Should do not when NO is selected', () => {
    expect(deleteModal.find('a').length).toBe(2);
    deleteModal.find('a').at(0).simulate('click');
    expect(deleteEventSpy.callCount).toBe(1);
  });

  it('Should contain the correct header title', () => {
    expect(deleteModal.find('h4').text()).toBe('Are you sure you want to detele: new dumb title?');
  });

  it('Should have the document content', () => {
    expect(deleteModal.find('p').text()).toBe('Test content');
  });

  it('Should not contain document card ', () => {
    expect(deleteModal.find('.card').length).toBe(0);
  });
});