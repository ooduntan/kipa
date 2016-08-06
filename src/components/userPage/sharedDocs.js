import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import SideNav from './sideNav';
import * as documentActions from '../../actions/documentAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DocController} from '../common/documentController';
import NewDocumentForm from './addDocument';
import Header from '../common/header';
import Fab from '../common/fab';
import UserContentPage from './userContentPage';
import DeleteModal from './deleteModal';
import OwnedDocs from './ownedDocs';

class SharedDocs extends Component {
  constructor() {
    super();

    this.prepareStoreForEdit = this.prepareStoreForEdit.bind(this);
  }

  prepareStoreForEdit(event) {
    const {id} = event.target;
    let selectedDocumentData = this.props.stateProp.userDocs.sharedDocs.doc[id];

    this.props.documentAction.preparePageForEdit(selectedDocumentData);
    this.context.router.push({
      pathname: '/docs/edit/shared/' + selectedDocumentData._id
    });
  }

  render() {
    console.log(this.props, 'Jesus is the son of God');
    const {
      userDocs: {
        docSuccess,
        deleteDoc,
        sharedDocs: {doc}
      },
      roles: {roles},
      userState: {userData}
    } = this.props.stateProp;

    return (
      <div className='row'>
        <Header
          signInEvent={this.props.logoutEvent}
          status={true}/>
        <SideNav
          roles={roles}
          userData={userData}/>
        <UserContentPage
          header='Shared Documents'
          doc={doc}
          cardType='shared'
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
}

SharedDocs.propTypes = {

}

function mapDispatchToProps(dispatch) {
  return {
    documentAction: bindActionCreators(documentActions, dispatch)
  }
}

export default connect(mapDispatchToProps)(DocController(SharedDocs));
