import SideNav from './sideNav';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Header from '../common/header';
import DeleteModal from './deleteModal';
import {bindActionCreators} from 'redux';
import UserContentPage from './userContentPage';
import React, {PropTypes, Component} from 'react';
import * as searchAction from '../../actions/searchAction';
import {DocController} from '../common/documentController';

class Search extends Component {
  constructor() {
    super();

  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'You should have all the answers');
    const {docSuccess, refreshed, updateSearch} = nextProps.stateProp.userDocs;
    const {userData: {role}} = nextProps.stateProp.userState;
    const {query: {q}} = nextProps.location;

    if ((!docSuccess && refreshed) || updateSearch) {
      this.props.searchActions.searchDocument(q, role);
    }

  }

  prepareStoreForEdit(event) {
    const {id} = event.target;
    let selectedDocumentData = this.props.stateProp.userDocs.search[id];

    this.props.documentAction.preparePageForEdit(selectedDocumentData);
    this.context.router.push({
      pathname: '/docs/edit/search/' + selectedDocumentData._id
    });
  }

  render() {
    const {query: {q}} = this.props.location;
    const {
      userDocs: {
        search,
        deleteDoc
      },
      userState: {userData},
      roles: {roles}
    } = this.props.stateProp;

    console.log(this.props, 'this is our props');

    return (
      <div className='row'>
        <Header
          signInEvent={this.props.logoutEvent}
          status={true}/>
        <SideNav
          roles={roles}
          userData={userData}/>
        <UserContentPage
          header={`Found ${search.length} Result(s) for ${q}`}
          doc={search}
          cardType='search'
          deleteEvent={this.props.confirmDelete}
          userId={userData._id}
          editCard={this.prepareStoreForEdit}
          />
          <DeleteModal
            docData={deleteDoc}
            deleteEvent={this.props.deleteDoc}/>
      </div>
    );
  }
}

Search.contextTypes = {
  router: PropTypes.object
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchAction, dispatch)
  }
}

function mapStateToProps(state) {
  return{}
}

export default connect(mapStateToProps, mapDispatchToProps)(DocController(Search));
