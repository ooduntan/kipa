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

    this.populateCard = this.populateCard.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.saveNewDocument = this.saveNewDocument.bind(this);
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
  }

  componentWillReceiveProps(nextProps) {
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

  fabClick(e){
    e.preventDefault();
    $('#modal1').openModal();
  }

  displayEditPage() {
    return <div>This is edit page</div>
  }

  onClickCheckbox(event) {
    let role = event.target.value;
    let access = this.state.docData.access;

    if (event.target.checked) {
      this.state.docData.access += ' ' + role
      return this.setState({
       docData: this.state.docData
     });
    }

    this.state.docData.access = access.replace(' ' + role, '')
     return this.setState({
      docData: this.state.docData
    });
  }

  saveNewDocument(event) {
    event.preventDefault();
    const {docData} = this.state;
    docData.access = docData.access.trim().replace(' ', ',')
    console.log(docData);

    this.props.userActions.createDoc(docData, event.currentTarget);
  }

  onChangeHandler(event) {
    this.state.docData[event.target.name] = event.target.value;
    this.setState({docData: this.state.docData});
  }

  populateCard(cardData, successState){
    if (successState && cardData.length > 0) {
      return cardData.map((eachDocs) => {
        const {_id, title, creator, createdAt, content} = eachDocs;
        return (
          <CardGroup
            key={_id}
            cardCorver={documentCover}
            cardTitle={title}
            cardCreator={creator}
            docDate={createdAt}
            cardContent={content}/>
        );
      })
    }

    return (<div>Oops!!! Sorry you don't any content at the moment</div>);
  }

  render() {
    return (
      <div className='content-container'>
        <div
          className='headerClass'>
          {this.props.stateProp.userDocs.header}
        </div>
        <Preloader
          size='big'
          showLoader={this.props.stateProp.userDocs.success}/>
        {this.showPageContent()}
        <div className='fab'>
          <a onClick={this.fabClick}
            className='btn-floating
            btn-large waves-effect waves-light'>
            <i className='material-icons'>add</i>
          </a>
        </div>
        <NewDocumentForm
          docRoles={this.props.stateProp.role}
          changeHandler={this.onChangeHandler}
          CheckboxHandler={this.onClickCheckbox}
          submitAction={this.saveNewDocument}
          showLoader={this.props.stateProp.userDocs.success}
          />
      </div>
    );
  }
}

UserContentPage.propTypes = {
  userDocs: PropTypes.array
}

function mapDispatchToProps(dispatch) {
  return{
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
