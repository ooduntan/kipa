import React, {Component, PropTypes} from 'react';
import EditDocumentForm from './editDocumentForm';
import {connect} from 'react-redux';
import SideNav from './sideNav';
import Header from '../common/header';
import {bindActionCreators} from 'redux';
import * as docActions from '../../actions/documentAction';
import {DocController} from '../common/documentController';

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

  componentWillMount() {
    // debugger;
    const {type, id} = this.props.params;
    const {userData} = this.props.stateProp.userState;
    let seletedDoc = this.props.stateProp.userDocs.editDocumentData;

    this.props.actions.updatePageWithEditData(this.props.params.id);

    const {title, access, content} = seletedDoc;
    this.setState({title, content, access});
  }

  componentWillReceiveProps(nextProps) {
    const {
      editSuccess,
      editDocumentData,
      searchTerm
    } = nextProps.stateProp.userDocs;

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

      if (this.props.params.type === 'search') {
        this.props.actions.updateSearch();
        this.context.router.push({
          pathname : '/search',
          query: {q: searchTerm}
        });
      }

    }
  }

  render() {
    console.log(this.props, 'this is the component');
    const {
      userState: {
        userData,
      },
      userDocs: {
        editPreLoader,
        editDocumentData
      },
      roles: {roles}
    } = this.props.stateProp;

    console.log(editDocumentData, 'i am still testing');

    return (
      <div>
        <Header
          signInEvent={this.props.logoutEvent}
          status={true}/>
        <SideNav
          roles={roles}
          userData={userData}/>
        <div className='content-container'>
          <div className='headerClass'>Edit Document</div>
          <EditDocumentForm
            preloader={editPreLoader}
            docRoles={roles}
            submitAction={this.submitForm}
            checkboxHandler={this.onClickCheckBox}
            changeHandler={this.onChangeHandler}
            tinymceEvent={this.textEditorChangeEvent}
            formDefaultData={editDocumentData}
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
  };
}

function mapStateToProps(state) {
  return
}

export default connect(mapStateToProps, mapDispatchToProps)(DocController(EditDocument));
