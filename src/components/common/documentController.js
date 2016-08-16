import {connect} from "react-redux";
import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import * as searchActions from "../../actions/searchAction";
import * as roleActions from "../../actions/roleActions";
import * as userActions from "../../actions/userAction";
import * as documentActions from "../../actions/documentAction";

export const DocController = (ChildComponent) => {
  class ParentComponent extends Component {
    constructor() {
      super();
      this.state = {
        docData: {
          title: '',
          content: '',
          access: []
        },
        searchTerm: ''
      };

      this.logout = this.logout.bind(this);
      this.fabClick = this.fabClick.bind(this);
      this.deleteDoc = this.deleteDoc.bind(this);
      this.searchDoc = this.searchDoc.bind(this);
      this.confirmDelete = this.confirmDelete.bind(this);
      this.OnchangeTinymce = this.OnchangeTinymce.bind(this);
      this.onChangeHandler = this.onChangeHandler.bind(this);
      this.addMoreDocument = this.addMoreDocument.bind(this);
      this.onClickCheckBox = this.onClickCheckBox.bind(this);
      this.modalSubmitAction = this.modalSubmitAction.bind(this);
    }

    componentWillMount() {
      if (!window.localStorage.getItem('token')) {
        this.context.router.push('/');
      } else {
        this.props.documentActions
          .getComponentResources(this.props.stateProp.userState.userData);
      }
    }

    componentWillReceiveProps(nextProps) {
      const {docSuccess} = this.props.stateProp.userDocs;

      if (!docSuccess) $('#createModal').closeModal();

      if (nextProps.stateProp.userDocs.redirect) {
        this.context.router.push('/');
      }
    }

    searchDoc(event) {
      let searchValue = event.target.value;
      const {role: {_id: roleId}} = this.props.stateProp.userState.userData;

      if (event.key === 'Enter') {
        this.props.searchActions.searchDocument(searchValue, roleId);
        this.context.router.push({
          pathname: '/search',
          query: {q: searchValue}
        });

        return;
      }
    }

    logout(event) {
      event.preventDefault();
      window.localStorage.removeItem('token');
      this.context.router.push('/');
    }

    deleteDoc(event) {
      event.preventDefault();
      const {_id: docId} = this.props.stateProp.userDocs.deleteDoc;

      this.props.documentActions.deleteDocAction(docId);
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

      this.props.documentActions.createModalData(selectedDocumentData);
      $('#deleteDocModal').openModal();
    }

    OnchangeTinymce(event) {
      const value = event.target.getContent();
      this.state.docData.content = value;
    }

    modalSubmitAction(event) {
      event.preventDefault();
      const {docData} = this.state;
      const {_id, username} = this.props.stateProp.userState.userData;
      const creatorData = {_id, username}

      docData.access = docData.access.toString();
      this.setState({
        docData: {
          title: '',
          content: '',
          access: []
        }
      });

      this.props.documentActions.createDoc(docData, creatorData);
      event.currentTarget.reset();
    }


    onClickCheckBox(event) {
      const value = event.target.value;
      const {access} = this.state.docData;

      if (access.indexOf(value) < 0) {
        access.push(value);
        return this.state.docData.access = access;
      }

      access.splice(access.indexOf(value), 1);
      this.state.docData.access = access;
    }

    fabClick(event) {
      event.preventDefault();
      this.setState({
        docData: {
          title: '',
          content: '',
          access: []
        }
      });
      $('#createModal').openModal();
    }

    addMoreDocument(MethodName, userRoleOrId, exisitingDocs) {
      const _this = this;

      $(window).scroll(function () {
        const winObj = $(window);
        const docObj = $(document);
        const {
          fullOwnedDoc,
          loadedSharedDocs,
          allSearchedDocs,
          lazyLoading
        } = _this.props.stateProp.userDocs;

        if (winObj.scrollTop() + winObj.height() === docObj.height()) {
          if (!lazyLoading && exisitingDocs.length > 9) {
            _this
              .props
              .documentActions[MethodName](exisitingDocs.length, userRoleOrId);
          }
        }
      });
    }

    render() {
      return (
        <ChildComponent
          deleteDoc={this.deleteDoc}
          searchEvent={this.searchDoc}
          onChangeHandler={this.onChangeHandler}
          confirmDelete={this.confirmDelete}
          OnchangeTinymce={this.OnchangeTinymce}
          modalSubmitAction={this.modalSubmitAction}
          onClickCheckbox={this.onClickCheckBox}
          logoutEvent={this.logout}
          lazyLoader={this.addMoreDocument}
          fabClick={this.fabClick}
          {...this.props}/>
      );
    }
  }

  ParentComponent.contextTypes = {
    router: PropTypes.object
  };

  ParentComponent.propTypes = {
    stateProp: PropTypes.object.isRequired,
    documentActions: PropTypes.object.isRequired

  };

  const mapDispatchToProps = (dispatch) => {
    return {
      documentActions: bindActionCreators(documentActions, dispatch),
      userActions: bindActionCreators(userActions, dispatch),
      searchActions: bindActionCreators(searchActions, dispatch),
      roleActions: bindActionCreators(roleActions, dispatch)
    };
  };

  const mapStateToProps = (state) => {
    return {
      stateProp: {
        userState: state.users,
        userDocs: state.docStates,
        roles: state.roleState
      }
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(ParentComponent);
};
