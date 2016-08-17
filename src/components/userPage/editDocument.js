import React, {Component, PropTypes} from 'react';
import EditDocumentForm from './editDocumentForm';
import SideNav from './sideNav';
import Header from '../common/header';
import {DocController} from '../common/documentController';

export class EditDocument extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      access: ''
    };

    this.submitForm = this.submitForm.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickCheckBox = this.onClickCheckBox.bind(this);
    this.textEditorChangeEvent = this.textEditorChangeEvent.bind(this);
  }

  componentWillMount() {
    let seletedDoc = this.props.stateProp.userDocs.editDocumentData;
    const {title, access, content} = seletedDoc;

    if (!window.localStorage.getItem('token')) {
      this.context.router.push('/');
    }

    this.props.documentActions.updatePageWithEditData(this.props.params.id);
    this.setState({title, content, access});
  }

  componentWillReceiveProps(nextProps) {
    const {
      editSuccess,
      editDocumentData,
      searchTerm
    } = nextProps.stateProp.userDocs;

    this.state = {
      title: editDocumentData.title,
      conent: editDocumentData.content,
      access: editDocumentData.access
    };

    if (editSuccess) {
      switch (this.props.params.type) {
        case 'owned':
          this.context.router.push('/owned-docs');
          break;
        case 'shared':
          this.context.router.push('/shared-docs');
          break;
        case 'search':
          this.props.documentActions.updateSearch();
          this.context.router.push({
            pathname: '/search',
            query: {q: searchTerm}
          });
          break;
      }
    }
  }

  onChangeHandler(event) {
    const {name, value} = event.target;
    this.state[name] = value;
    // this.props.userActions.activateSubmit();
  }

  submitForm(event) {
    event.preventDefault();
    this.state.access = this.state.access.toString();
    this.props.documentActions.upadateDocument(this.state, this.props.params.id);
  }

  textEditorChangeEvent(event) {
    const value = event.target.getContent();
    this.state.content = value;
  }

  onClickCheckBox(event) {
    const value = event.target.value;
    const {access} = this.state;

    if (access.indexOf(value) < 0) {
      access.push(value);
      return this.state.access = access;
    }

    access.splice(access.indexOf(value), 1);
    this.state.access = access;
  }

  render() {
    const {
      userState: {
        userData
      },
      userDocs: {
        editPreLoader,
        editDocumentData
      },
      roles: {roles}
    } = this.props.stateProp;

    return (
      <div>
        <Header
          searchEvent={this.props.searchEvent}
          logoutEvent={this.props.logoutEvent}
          status/>
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
};

EditDocument.propTypes = {
  onChangeHandler: PropTypes.func,
  stateProp: PropTypes.object,
  params: PropTypes.object,
  actions: PropTypes.object,
  logoutEvent: PropTypes.func,
  documentActions: PropTypes.object
};

export default DocController(EditDocument);