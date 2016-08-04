import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import CardGroup from './cardDisplay';
import {connect} from 'react-redux';
import {DropDown} from '../common/input';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import * as documentAction from '../../actions/documentAction';
import documentCover from '../../images/coverPlaceHolder.jpg';
import NewDocumentForm from './addDocument';
import Preloader from '../common/preloader';
import EditUserComponent from './editUserDataPage';
import EditDocument from './EditDocument';


class UserContentPage extends Component {
  constructor() {
    super();
    this.state = {
      docData: {
        title: '',
        content: '',
        access: ''
      }
    };

    this.editDoc            = this.editDoc.bind(this);
    this.fabClick           = this.fabClick.bind(this);
    this.deleteDoc          = this.deleteDoc.bind(this);
    this.populateCard       = this.populateCard.bind(this);
    this.confirmDelete      = this.confirmDelete.bind(this);
    this.OnchangeTinymce    = this.OnchangeTinymce.bind(this);
    this.showPageContent    = this.showPageContent.bind(this);
    this.onChangeHandler    = this.onChangeHandler.bind(this);
    this.onClickCheckbox    = this.onClickCheckbox.bind(this);
    this.modalSubmitAction  = this.modalSubmitAction.bind(this);
    this.displayEditDocPage = this.displayEditDocPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {docSuccess} = this.props.stateProp.userDocs;
    if (!docSuccess) $('#modal1').closeModal();
  }

  showPageContent() {
    const {sharedDocs, docSuccess, docs, header} = this.props.stateProp.userDocs;
    switch (header) {
      case 'MY DOCUMENTS':
        return this.populateCard(docs, docSuccess, 'owned');
        break;
      case 'SHARED DOCUMENTS':
        return this.populateCard(sharedDocs.doc, docSuccess, 'shared');
        break;
      case 'EDIT DOCUMENT':
        return this.displayEditDocPage();
        break;
      case 'EDIT PROFILE':
        return this.displayEditUserPage();
        break;
      default:

    }
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
    $('#modal2').openModal();
  }

  displayEditUserPage() {
    return (<EditUserComponent/>);
  }

  displayEditDocPage() {
    return (<EditDocument
      redirect={this.props.navigator}
      />);
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
    if (!docData.access.length) delete docData.access;
    this.props.userActions.createDoc(docData, event.currentTarget);
  }

  editDoc(event) {
    const {id} = event.target;
    const {userDocs} = this.props.stateProp;
    let selectedDocumentData;
    let cardData = id.split('__');

    if (cardData[0] === 'owned') {
      selectedDocumentData = userDocs.docs[cardData[1]];
    } else {
      selectedDocumentData = userDocs.sharedDocs.doc[cardData[1]];
    }

    this.props.userActions.preparePageForEdit(selectedDocumentData, cardData[0]);
    this.props.userActions.showMenuContent('EDIT DOCUMENT');
  }

  deleteDoc(event) {
    event.preventDefault();
    const {_id: docId} = this.props.stateProp.userDocs.deleteDoc
    this.props.userActions.deleteDocAction(docId);
    $('#modal1').closeModal();
  }

  OnchangeTinymce(event) {
    const value = event.target.getContent();
    this.state.docData.content =  value;
  }

  confirmDelete(event) {
    const {userDocs} = this.props.stateProp;
    let id = event.target.id;
    let selectedDocumentData;
    let docTypeAndId = id.split('__');

    if (docTypeAndId[0] === 'owned') {
      selectedDocumentData = userDocs.docs[docTypeAndId[1]];
    } else {
      selectedDocumentData = userDocs.sharedDocs.doc[docTypeAndId[1]];
    }

    this.props.userActions.createModalData(selectedDocumentData);
    $('#modal1').openModal();
  }

  onChangeHandler(event) {
    event.preventDefault();
    const {name, value} = event.target;
    this.state.docData[name] = value;
  }

  populateCard(cardData, successState, cardType) {
    if (successState && cardData.length) {
      return cardData.map((eachDocs, index) => {
        const {_id, title, creator, createdAt, content} = eachDocs;
        return (
          <CardGroup
            cardType={cardType}
            key={_id}
            id={_id}
            docIndex={index}
            cardCorver={documentCover}
            cardTitle={title}
            cardCreator={creator}
            docDate={moment(createdAt).fromNow()}
            editCard={this.editDoc}
            currentUserId={this.props.stateProp.currentUser._id}
            deleteCard={this.deleteDoc}
            confirmDelete={this.confirmDelete}
            cardContent={content}/>
        );
      });
    }

    return (
      <div>Oops!!! Sorry you don't any content at the moment</div>
    );
  }

  render() {
    const {deleteDoc: {title, content}} = this.props.stateProp.userDocs;
    return (
      <div className='content-container'>
        <div className='headerClass'>
          {this.props.stateProp.userDocs.header}
        </div>
        <Preloader
          size='big'
          showLoader={this.props.stateProp.userDocs.docSuccess}/>
        {this.showPageContent()}
        <div className='fab'>
          <a onClick={this.fabClick} className='btn-floating
            btn-large waves-effect waves-light'>
            <i className='material-icons'>add</i>
          </a>
        </div>
        <NewDocumentForm
          docRoles={this.props.stateProp.role}
          changeHandler={this.onChangeHandler}
          CheckboxHandler={this.onClickCheckbox}
          submitAction={this.modalSubmitAction}
          tinymceEvent={this.OnchangeTinymce}
          showLoader={this.props.stateProp.userDocs.docSuccess}/>
        <div id='modal1' className='modal modal-fixed-footer'>
            <div className='modal-content'>
              <h4 className='custom-blue-text'>Are you sure you want to detele: {title}?</h4>
              <p>{content}</p>
          </div>
          <div className='modal-footer'>
            <a onClick={this.deleteDoc}
              className='delete-doc-modal modal-action waves-effect waves-red btn-flat'>Yes</a>
            <a className='close-delete-modal modal-action modal-close waves-effect waves-green btn-flat'>No</a>
          </div>
        </div>

      </div>
    );
  }
}

UserContentPage.propTypes = {
  userDocs: PropTypes.array
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(documentAction, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    stateProp: {
      currentUser: state.users.userData,
      userDocs: state.docStates,
      role: state.roleState.roles
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContentPage);
