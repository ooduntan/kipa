import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import CardGroup from './cardDisplay';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as documentAction from '../../actions/documentAction';
import documentCover from '../../images/coverPlaceHolder.jpg';
import NewDocumentForm from './addDocument';
import Preloader from '../common/preloader';

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

    this.editDoc = this.editDoc.bind(this);
    this.fabClick = this.fabClick.bind(this);
    this.deleteDoc = this.deleteDoc.bind(this);
    this.populateCard = this.populateCard.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.saveNewDocument = this.saveNewDocument.bind(this);
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.modalSubmitAction = this.modalSubmitAction.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'this is the next props i am geting');
    const {success} = this.props.stateProp.userDocs;
    if (!success) $('#modal1').closeModal();
  }

  showPageContent() {
    const {sharedDocs, success, docs, header} = this.props.stateProp.userDocs;
    switch (header) {
      case 'MY DOCUMENTS':
        return this.populateCard(docs, success);
        break;
      case 'SHARED DOCUMENTS':
        return this.populateCard(sharedDocs.doc, success);
        break;
      case 'EDIT PROFILE':
        return this.displayEditPage();
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
    this.props.userActions.prepareModalNewDoc();
    $('#modal1').openModal();
  }

  displayEditPage() {
    return <div>This is edit page</div>
  }

  onClickCheckbox(event) {
    console.log(this.state.docData, 'kjdkjdkdfk');
    let role = event.target.value;
    let access = this.state.docData.access;
    console.log(role);
    if (event.target.checked) {
      this.state.docData.access += ' ' + role;
      return this.setState({docData: this.state.docData});
    }

    this.state.docData.access = access.replace(' ' + role, '');
    return this.setState({docData: this.state.docData});
  }

  saveNewDocument(event) {
    event.preventDefault();
    const {docData} = this.state;
    docData.access = docData.access.trim();
    docData.access = docData.access.replace(/\s/g, ',');

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

  submitEditedDoc() {
    console.log(this.state.docData);
    alert('this is working');
  }

  modalSubmitAction(event) {
    event.preventDefault();
    const {actionText} = this.props.stateProp.userDocs.modalData;

    if (actionText === 'Create') {
      return this.saveNewDocument(event);
    }

    return this.submitEditedDoc(event);
  }

  editDoc(event) {
    const {id} = event.target;
    const selectedDocumentData = this.props.stateProp.userDocs.docs[id];
    this.props.userActions.prepareModalForEdit(selectedDocumentData);
    $('#modal1').openModal();
    // this.props.userActions.editDocAction(event.target.id)
  }

  deleteDoc(event) {
    const docIndex = event.target.id;
    const selectedDocumentData = this.props.stateProp.userDocs.docs[docIndex];
    const docId = selectedDocumentData._id;
    const {docs} = this.props.stateProp.userDocs;

    docs.splice(docIndex, 1);
    this.props.userActions.deleteDocAction(docId, docs);
  }

  onChangeHandler(event) {
    event.preventDefault();
    const {name, value} = event.target;
    const existingData = this.props.stateProp.userDocs.modalData.docData;
    console.log(existingData, 'this is modal data');
    if (this.state.docData.title.length) this.state.docData = existingData;
      console.log(this.state.docData, '1st occurence');
      this.state.docData[name] = value;
      this.setState({docData: this.state.docData});
      console.log(this.state.docData, '2nd occurence');

    // if (existingData.title.length) {
    //   console.log(existingData[name], 'this is doc name');
    //   this.state.docData[name] = existingData[name] + value;
    //   console.log(this.state.docData);
    //   this.setState({docData: this.state.docData});
    //   console.log(this.state.docData, 'Previous');
    // } else {
    //   const {docData} = this.state;
    //   console.log(this.state.docData, '1st occurence');
    //   docData[name] = value;
    //   this.setState({docData: docData});
    //   console.log(this.state.docData, '2nd occurence');
    // }
  }

  populateCard(cardData, successState) {
    if (successState && cardData.length) {
      return cardData.map((eachDocs, index) => {
        const {_id, title, creator, createdAt, content} = eachDocs;
        return (
          <CardGroup
            key={_id}
            id={_id}
            docIndex={index}
            cardCorver={documentCover}
            cardTitle={title}
            cardCreator={creator}
            docDate={createdAt}
            editCard={this.editDoc}
            deleteCard={this.deleteDoc}
            cardContent={content}/>
        );
      })
    }

    return (
      <div>Oops!!! Sorry you don't any content at the moment</div>
    );
  }

  render() {
    // const
    return (
      <div className='content-container'>
        <div className='headerClass'>
          {this.props.stateProp.userDocs.header}
        </div>
        <Preloader size='big' showLoader={this.props.stateProp.userDocs.success}/> {this.showPageContent()}
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
          modalData={this.props.stateProp.userDocs.modalData}
          showLoader={this.props.stateProp.userDocs.success}/>
        
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
  console.log(state, 'this thei mapstatet to porps')
  return {
    stateProp: {
      currentUser: state.users.userData,
      userDocs: state.docStates,
      role: state.roleState.roles
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContentPage);
