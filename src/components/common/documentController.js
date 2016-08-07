import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import * as documentActions from '../../actions/documentAction';

export const DocController = (ChildComponent) => {
  class ParentComponent extends Component {
    constructor() {
      super();
      this.state = {
        docData: {
          title: '',
          content: '',
          access: ''
        },
        searchTerm: ''
      };

      this.logout            = this.logout.bind(this);
      this.fabClick          = this.fabClick.bind(this);
      this.deleteDoc         = this.deleteDoc.bind(this);
      this.confirmDelete     = this.confirmDelete.bind(this);
      this.OnchangeTinymce   = this.OnchangeTinymce.bind(this);
      this.onChangeHandler   = this.onChangeHandler.bind(this);
      this.addMoreDocument   = this.addMoreDocument.bind(this);
      this.onClickCheckbox   = this.onClickCheckbox.bind(this);
      this.modalSubmitAction = this.modalSubmitAction.bind(this);
    }

    logout(event) {
      event.preventDefault();
      window.localStorage.removeItem('token');
      this.context.router.push('/');
    }

    deleteDoc(event) {
      event.preventDefault();
      const {_id: docId} = this.props.stateProp.userDocs.deleteDoc
      this.props.documentAction.deleteDocAction(docId);
      $('#deleteDocModal').closeModal();
    }

    onChangeHandler(event) {
      event.preventDefault();
      const {name, value} = event.target;
      this.state.docData[name] = value;
    }

    confirmDelete(event) {
      const {userDocs} = this.props.stateProp;
      let docIndex = event.target.id;
      let selectedDocumentData = userDocs.docs[docIndex];

      this.props.documentAction.createModalData(selectedDocumentData);
      $('#deleteDocModal').openModal();
    }

    OnchangeTinymce(event) {
      const value = event.target.getContent();
      this.state.docData.content =  value;
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

    fabClick(event) {
      event.preventDefault();
      this.setState({
        docData: {
          title: '',
          content: '',
          access: ''
        }
      });
      $('#createModal').openModal();
    }

    componentWillMount() {
      if (!window.localStorage.getItem('token')) {
        this.context.router.push('/');
      } else {
        this.props.documentAction
          .getComponentResources(this.props.stateProp.userState.userData);
      }
    }

    addMoreDocument(MethodName) {
      const _this = this;
      const {userData: {_id}} = this.props.stateProp.userState;

      $(window).scroll(function() {
        const winObj = $(window);
        const docObj =  $(document);
        const {userData: {_id}} = _this.props.stateProp.userState;
        const {docs, fullOwnedDoc, lazyLoading} = _this.props.stateProp.userDocs;

        if(winObj.scrollTop() + winObj.height() === docObj.height()) {
          if (!fullOwnedDoc && !lazyLoading && docs.length > 9) {
            _this.props.documentAction.addOwnedDocs(docs.length, _id);
          }
        }
      });
    }

    componentWillReceiveProps(nextProps) {
      const {docSuccess} = this.props.stateProp.userDocs;

      if (!docSuccess) $('#createModal').closeModal();

      if (nextProps.stateProp.userDocs.redirect) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ChildComponent
        deleteDoc={this.deleteDoc}
        onChangeHandler={this.onChangeHandler}
        confirmDelete={this.confirmDelete}
        OnchangeTinymce={this.OnchangeTinymce}
        modalSubmitAction={this.modalSubmitAction}
        onClickCheckbox={this.onClickCheckbox}
        logoutEvent={this.logout}
        lazyLoader={this.addMoreDocument}
        fabClick={this.fabClick}
         {...this.props}/>
    }
  }

  ParentComponent.contextTypes = {
    router: PropTypes.object
  }

  function mapDispatchToProps(dispatch) {
    return {
      documentAction: bindActionCreators(documentActions, dispatch)
    }
  }

  function mapStateToProps(state) {
    return {
      stateProp: {
        userState: state.users,
        userDocs: state.docStates,
        roles: state.roleState
      }
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(ParentComponent);
}
