import React, {Component} from 'react';
import EditDocumentForm from './editDocumentForm';
import {connect} from 'react-redux';
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
    const {docData: {_id: docId}} = this.props.docState.editDocumentData;
    this.state.access =  this.state.access.toString();

    this.props.actions.upadateDocument(this.state, docId);
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

  componentDidMount() {
    const {
      docData: {
        title,
        access,
        content
      }
    } = this.props.docState.editDocumentData;
    console.log(access);
    this.setState({title, content, access});
  }

  componentWillReceiveProps(nextProps) {
    console.log('i recieved props', nextProps.docState.editDocumentData);
    const {editSuccess, editDocumentData: {ownerPage}} = nextProps.docState;
    console.log(editSuccess, ownerPage);
    if (editSuccess && ownerPage === 'owned') {
      this.props.redirect('MY DOCUMENTS');
    }

    if (editSuccess && ownerPage === 'shared') {
      console.log('shared is called');
      this.props.redirect('SHARED DOCUMENTS');
    }
  }

  render() {
    return (
      <EditDocumentForm
        preloader={this.props.userState.editPreLoader}
        docRoles={this.props.roles}
        submitAction={this.submitForm}
        checkboxHandler={this.onClickCheckBox}
        changeHandler={this.onChangeHandler}
        tinymceEvent={this.textEditorChangeEvent}
        formDefaultData={this.props.docState.editDocumentData.docData}
        />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(docActions, dispatch)
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    docState: state.docStates,
    userState: state.users,
    roles: state.roleState.roles
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDocument)
