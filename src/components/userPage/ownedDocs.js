import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import SideNav from './sideNav';
import * as documentActions from '../../actions/documentAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NewDocumentForm from './addDocument';
import Header from '../common/header';
import Fab from '../common/fab';
import {DocController} from '../common/documentController';
import UserContentPage from './userContentPage';
import DeleteModal from './deleteModal';

class OwnDocument extends Component {
  constructor() {
    super();
    this.state = {
      dispatched: false
    };

    this.prepareStoreForEdit = this.prepareStoreForEdit.bind(this);
  }

  prepareStoreForEdit(event) {
    const {id} = event.target;
    let selectedDocumentData = this.props.stateProp.userDocs.docs[id];

    this.props.documentAction.preparePageForEdit(selectedDocumentData);
    this.context.router.push({
      pathname: '/docs/edit/owned/' + selectedDocumentData._id
    });
  }

  componentWillReceiveProps(nextPorp, prevProps) {
    const _this = this;
    this.props.lazyLoader('addOwnedDocs');
  }

  componentWillUnmount() {
    $(window).unbind('scroll', this.props.lazyLoader);
    console.log(this.props.lazyLoader);
    // this.props.lazyloader.unbind();
  }

  render() {
    const {
      userDocs: {
        docSuccess,
        deleteDoc,
        docs,
        lazyLoading
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
          header='My Documents'
          doc={docs}
          cardType='owned'
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

OwnDocument.contextTypes = {
  router: PropTypes.object
}

function mapDispatchToProps(dispatch) {
  return {
    documentAction: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapDispatchToProps)(DocController(OwnDocument));
