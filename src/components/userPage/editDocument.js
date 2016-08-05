import React, {Component, PropTypes} from 'react';
import EditDocumentForm from './editDocumentForm';
import {connect} from 'react-redux';
import SideNav from './sideNav';
import Header from '../common/header';
import {bindActionCreators} from 'redux';
import * as docActions from '../../actions/documentAction';

class EditDocument extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      access: '',
    }

    this.submitForm             = this.submitForm.bind(this);
    this.onChangeHandler        = this.onChangeHandler.bind(this);
    this.onClickCheckBox        = this.onClickCheckBox.bind(this);
    this.textEditorChangeEvent  = this.textEditorChangeEvent.bind(this);
  }

  onChangeHandler(event) {
    const {name, value} = event.target;
    this.state[name]    = value;

    // this.props.userActions.activateSubmit();
  }

  submitForm(event) {
    event.preventDefault();
    this.state.access =  this.state.access.toString();

    this.props.actions.upadateDocument(this.state, this.props.params.id);
    console.log(this.state);
  }

  textEditorChangeEvent(event) {
    const value = event.target.getContent();
    this.state.content =  value;
    console.log(this.state);
  }

  onClickCheckBox(event) {
    const value = event.target.value
    const {access} = this.state;
    if (access.indexOf(value) < 0) {
      access.push(value);
      this.state.access = access;
    } else {
      access.splice(access.indexOf(value), 1);
      this.state.access = access;
    }
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

    this.props.documentAction
      .preparePageForEdit(selectedDocumentData, cardData[0]);
    this.props.documentAction.showMenuContent('EDIT DOCUMENT');
  }

  componentWillMount() {
    const {type, id} = this.props.params;
    const {userData} = this.props.userState;
    let seletedDoc = this.props.docState.editDocumentData;

    if (!Object.keys(userData).length) {
      console.log(this.props);

      this.props.actions.updatePageWithEditData(this.props.params.id);
      this.props.actions.getComponentResources(this.props.userState.userData);

    }
    const {title, access, content} = seletedDoc;
    this.setState({title, content, access});
    console.log(this.props, 'this is from the component will mount ');
  }

  componentWillReceiveProps(nextProps) {
    console.log('i recieved props', nextProps);
    const {editSuccess, editDocumentData} = nextProps.docState;

    this.state = {
      title : editDocumentData.title,
      conent: editDocumentData.content,
      access: editDocumentData.access
    }

    if (editSuccess) {
      if (this.props.params.type === 'owned') {
        this.context.router.push('/owned-docs');
      }

      if (this.props.params.type === 'shared') {
        this.context.router.push('/shared-docs');
      }

    }
  }

  render() {
    return (
      <div>
        <Header/>
        <SideNav
          roles={this.props.roles}
          userData={this.props.userState.userData}/>
        <div className='content-container'>
          <div className='headerClass'>Edit Document</div>
          <EditDocumentForm
            preloader={this.props.userState.editPreLoader}
            docRoles={this.props.roles}
            submitAction={this.submitForm}
            checkboxHandler={this.onClickCheckBox}
            changeHandler={this.onChangeHandler}
            tinymceEvent={this.textEditorChangeEvent}
            formDefaultData={this.props.docState.editDocumentData}
            />
        </div>
    </div>
    );
  }
}

EditDocument.contextTypes = {
  router: PropTypes.object
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(docActions, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    docState: state.docStates,
    userState: state.users,
    roles: state.roleState.roles
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDocument)
