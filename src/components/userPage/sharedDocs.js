import React, {Component, PropTypes} from 'react';
import SideNav from './sideNav';
import {DocController} from '../common/documentController';
import NewDocumentForm from './addDocument';
import Header from '../common/header';
import Fab from '../common/fab';
import UserContentPage from './userContentPage';
import DeleteModal from './deleteDoc';

export class SharedDocs extends Component {
  constructor() {
    super();
    
    this.addMoreSharedDocs   = this.addMoreSharedDocs.bind(this);
    this.prepareStoreForEdit = this.prepareStoreForEdit.bind(this);
  }

  componentWillMount() {
    this.props.documentActions.editDocSuccess()
  }

  componentDidMount() {
    $(window).scroll(this.addMoreSharedDocs)
  }

  componentWillUnmount() {
    $(window).unbind('scroll');
  }

  addMoreSharedDocs() {
    const winObj = $(window);
    const docObj = $(document);
    const {lazyLoading, sharedDocs: {doc}} = this.props.stateProp.userDocs;
    const {role: {_id: roleId}} = this.props.stateProp.userState.userData;

    if (winObj.scrollTop() + winObj.height() === docObj.height()
      && !lazyLoading && doc.length > 9) {
      this
        .props
        .documentActions
        .addSharedDocs(doc.length, roleId);
    }
  }

  prepareStoreForEdit(event) {
    const {id} = event.target;
    let selectedDocumentData = this.props.stateProp.userDocs.sharedDocs.doc[id];

    this.context.router.push({
      pathname: '/docs/edit/shared/' + selectedDocumentData._id
    });
  }

  render() {
    const {
      userDocs: {
        docSuccess,
        deleteDoc,
        sharedDocs: {doc},
        lazyLoading
      },
      roles: {roles},
      userState: {userData}
    } = this.props.stateProp;

    return (
      <div className='row'>
        <Header
          searchEvent={this.props.searchEvent}
          signInEvent={this.props.logoutEvent}
          status/>
        <SideNav
          roles={roles}
          userData={userData}/>
        <UserContentPage
          header='Shared Documents'
          doc={doc}
          cardType='shared'
          lazyLoading={!lazyLoading}
          deleteEvent={this.props.confirmDelete}
          userId={userData._id}
          editCard={this.prepareStoreForEdit}
        />
        <Fab
          clickEvent={this.props.fabClick}/>
        <NewDocumentForm
          docRoles={roles}
          changeHandler={this.props.onChangeHandler}
          CheckboxHandler={this.props.onClickCheckbox}
          submitAction={this.props.modalSubmitAction}
          tinymceEvent={this.props.OnchangeTinymce}
          showLoader={docSuccess}/>
        <DeleteModal
          docData={deleteDoc}
          deleteEvent={this.props.deleteDoc}/>
      </div>
    );
  }
}

SharedDocs.contextTypes = {
  router: PropTypes.object
};

SharedDocs.propTypes = {
  deleteDoc: PropTypes.func,
  onClickCheckbox: PropTypes.func,
  onChangeHandler: PropTypes.func,
  fabClick: PropTypes.func,
  OnchangeTinymce: PropTypes.func,
  confirmDelete: PropTypes.func,
  stateProp: PropTypes.object,
  documentActions: PropTypes.object,
  logoutEvent: PropTypes.func,
  modalSubmitAction: PropTypes.func
};

export default DocController(SharedDocs);
