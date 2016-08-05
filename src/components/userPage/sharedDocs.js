import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import SideNav from './sideNav';
import * as documentActions from '../../actions/documentAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NewDocumentForm from './addDocument';
import Header from '../common/header';
import Fab from '../common/fab';
import UserContentPage from './userContentPage';
import DeleteModal from './deleteModal';
import OwnedDocs from './ownedDocs';

class SharedDocs extends Component {
  constructor() {
    super();

    this.fabClick               = this.fabClick.bind(this);
    this.deleteDoc              = this.deleteDoc.bind(this);
    this.confirmDelete          = this.confirmDelete.bind(this);
    this.OnchangeTinymce        = this.OnchangeTinymce.bind(this);
    this.onChangeHandler        = this.onChangeHandler.bind(this);
    this.onClickCheckbox        = this.onClickCheckbox.bind(this);
    this.modalSubmitAction      = this.modalSubmitAction.bind(this);
    this.changeUserContent      = this.changeUserContent.bind(this);
    this.prepareStoreForEdit    = this.prepareStoreForEdit.bind(this);
  }

  modalSubmitAction(event) {
    event.preventDefault();
    const {docData} = this.state;

    docData.access = docData.access.trim().replace(/\s/g, ',');
    this.setState({
      docData: {
        title: '',
        content: '',
        access: ''
      }
    });

    this.props.documentAction.createDoc(docData, event.currentTarget);
  }

  prepareStoreForEdit(event) {
    const {id} = event.target;
    let selectedDocumentData = this.props.stateProp.userDocs.sharedDocs.doc[id];

    this.props.documentAction.preparePageForEdit(selectedDocumentData);
    this.context.router.push({
      pathname: 'docs/edit/shared/' + selectedDocumentData._id
    });
  }

  onClickCheckbox(event) {
    let role = event.target.value;
    let access = this.state.docData.access;

    if (event.target.checked) {
      this.state.docData.access += ' ' + role;
      return this.setState({docData: this.state.docData});
    }

    this.state.docData.access = access.replace(' ' + role, '');
    return this.setState({docData: this.state.docData});
  }

  fabClick(e) {
    e.preventDefault();
    this.setState({
      docData: {
        title: '',
        content: '',
        access: ''
      }
    });
    $('#createModal').openModal();
  }

  onChangeHandler(event) {
    event.preventDefault();
    const {name, value} = event.target;
    this.state.docData[name] = value;
  }

  componentWillMount() {
    if (!window.localStorage.getItem('token')) {
      this.context.router.push('/');
    } else {
      this.props.documentAction
        .getComponentResources(this.props.stateProp.currentUser);
    }
  }

	componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'will mount');
    const {docSuccess} = this.props.stateProp.userDocs;

    if (!docSuccess) $('#createModal').closeModal();

    if (nextProps.stateProp.userDocs.redirect) {
      this.context.router.push('/');
    }
  }

  changeUserContent(location) {
    if (typeof location === 'object') {
      location = location.currentTarget.id;
    }

    this.props.documentAction.showMenuContent(location);
  }

  OnchangeTinymce(event) {
    const value = event.target.getContent();
    this.state.docData.content =  value;
  }

  confirmDelete(event) {
    const {userDocs} = this.props.stateProp;
    let docIndex = event.target.id;
    let selectedDocumentData = userDocs.sharedDocs.doc[docIndex];

    this.props.documentAction.createModalData(selectedDocumentData);
    $('#deleteDocModal').openModal();
  }

  deleteDoc(event) {
    event.preventDefault();
    const {_id: docId} = this.props.stateProp.userDocs.deleteDoc
    this.props.documentAction.deleteDocAction(docId);
    $('#deleteDocModal').closeModal();
  }

  render() {
    console.log(this, ' this is my props');
    const {
      userDocs: {
        docSuccess,
        deleteDoc,
        sharedDocs: {doc}
      },
      roles: {roles},
      currentUser
    } = this.props.stateProp;

    return (
      <div className='row'>
        <Header/>
        <SideNav
          roles={roles}
          userData={currentUser}/>
        <UserContentPage
          header='Shared Documents'
          doc={doc}
          cardType='shared'
          deleteEvent={this.confirmDelete}
          userId={currentUser._id}
          editCard={this.prepareStoreForEdit}
          />
        <Fab
          clickEvent={this.fabClick}/>
        <NewDocumentForm
         docRoles={roles}
         changeHandler={this.onChangeHandler}
         CheckboxHandler={this.onClickCheckbox}
         submitAction={this.modalSubmitAction}
         tinymceEvent={this.OnchangeTinymce}
         showLoader={docSuccess}/>
       <DeleteModal
         docData={deleteDoc}
         deleteEvent={this.deleteDoc}/>
      </div>
    );
  }
}

SharedDocs.contextTypes = {
  router: PropTypes.object
}

SharedDocs.propTypes = {

}

function mapStateToProps(state) {
  return {
    stateProp: {
      currentUser: state.users.userData,
      userDocs: state.docStates,
      roles: state.roleState
    }
  };

}

function mapDispatchToProps(dispatch) {
  return {
    documentAction: bindActionCreators(documentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharedDocs);
