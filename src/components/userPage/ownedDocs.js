import React, {PropTypes, Component} from 'react';
import SideNav from './sideNav';
import NewDocumentForm from './addDocument';
import Header from '../common/header';
import Fab from '../common/fab';
import ViewDocModal from './viewDocModal';
import {DocController} from '../common/documentController';
import UserContentPage from './userContentPage';
import DeleteModal from './deleteDoc';

export class OwnDocument extends Component {
  constructor() {
    super();

    this.addMoreDocs              = this.addMoreDocs.bind(this);
    this.viewDocEvent             = this.viewDocEvent.bind(this);
    this.prepareStoreForEdit      = this.prepareStoreForEdit.bind(this);
    this.getSelectedDocForDelete  = this.getSelectedDocForDelete.bind(this);
  }

  componentWillMount() {
    this.props.documentActions.editDocSuccess();
    if (!window.localStorage.getItem('token')) {
      this.context.router.push('/');
    }
  }

  componentDidMount() {
    $(window).scroll(this.addMoreDocs);

    $(document).ready(function () {
      const sideNavDom = $('.button-collapse');
      $('.documents').addClass('current-menu');
      sideNavDom.sideNav();
      sideNavDom.sideNav('hide');
    });
  }

  componentWillUnmount() {
    $('.documents').removeClass('current-menu');
    $(window).unbind('scroll');
  }

  addMoreDocs() {
      const winObj = $(window);
      const docObj = $(document);
      const {lazyLoading, docs} = this.props.stateProp.userDocs;
      const {_id: userId} = this.props.stateProp.userState.userData;

      if (winObj.scrollTop() + winObj.height() === docObj.height()
        && !lazyLoading && docs.length > 9) {
          this
            .props
            .documentActions
            .addOwnedDocs(docs.length, userId);
      }
  }

  viewDocEvent(event) {
    const {id} = event.target;
    let selectedDocumentData = this.props.stateProp.userDocs.docs[id];
    selectedDocumentData.index = id;

    this.props.documentActions.prepareStoreForDocDetails(selectedDocumentData);
    $('#editDocModal').openModal();
  }

  getSelectedDocForDelete(event) {
    const {docs} = this.props.stateProp.userDocs;
    let docIndex = event.target.id;
    let selectedDocumentData = docs[docIndex];

    this.props.confirmDelete(selectedDocumentData);
  }

  prepareStoreForEdit(event) {
    const {id} = event.target;
    let selectedDocumentData = this.props.stateProp.userDocs.docs[id];

    $('#editDocModal').closeModal();
    this.context.router.push({
      pathname: '/docs/edit/owned/' + selectedDocumentData._id
    });
  }

  render() {
    const {
      userDocs: {
        docSuccess,
        deleteDoc,
        docs,
        lazyLoading,
        viewDoc
      },
      roles: {roles},
      userState: {userData}
    } = this.props.stateProp;

    return (
      <div className='row'>
        <Header
          userData={userData}
          searchEvent={this.props.searchEvent}
          logoutEvent={this.props.logoutEvent}
          status/>
        <SideNav userData={userData}/>
        <UserContentPage
          header='My Documents'
          doc={docs}
          cardType='owned'
          viewEvent={this.viewDocEvent}
          lazyLoading={!lazyLoading}
          deleteEvent={this.getSelectedDocForDelete}
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
        <ViewDocModal
          docData={viewDoc}
          editEvent={this.prepareStoreForEdit}/>
        <DeleteModal
          docData={deleteDoc}
          deleteEvent={this.props.deleteDoc}/>
      </div>
    );
  }
}

OwnDocument.propTypes = {
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

OwnDocument.contextTypes = {
  router: PropTypes.object
};

export default DocController(OwnDocument);
