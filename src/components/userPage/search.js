import SideNav from './sideNav';
import Header from '../common/header';
import DeleteModal from './deleteDoc';
import UserContentPage from './userContentPage';
import React, {PropTypes, Component} from 'react';
import {DocController} from '../common/documentController';

export class Search extends Component {
  constructor() {
    super();
    
    this.addMoreSearchResult = this.addMoreSearchResult.bind(this);
  }
  
  

  componentWillReceiveProps(nextProps) {
    const {
      docSuccess, 
      refreshed, 
      updateSearch, 
    } = nextProps.stateProp.userDocs;
    const {userData: {role: {_id: roleId}}} = nextProps.stateProp.userState;
    const {query: {q}} = nextProps.location;

    if ((!docSuccess && refreshed) || updateSearch) {
      this.props.searchActions.searchDocument(q, roleId);
    }
    
  }

  componentDidMount() {
    // $(window).scroll(this.addMoreSearchResult);
  }
  
  componentWillUnmount() {
    $(window).unbind('scroll');
  }

  addMoreSearchResult() {
    const winObj = $(window);
    const docObj = $(document);
    const {query: {q}} = this.props.location;
    const {lazyLoading, search} = _this.props.stateProp.userDocs;
    const {userData: {role: {_id: roleId}}} = this.props.stateProp.userState;

    if (winObj.scrollTop() + winObj.height() === docObj.height() 
      && !lazyLoading && search.length > 9) {
        this
          .props
          .searchActions
          .addMoreSearchResult(search.length, roleId, q);
    }
  }

  prepareStoreForEdit(event) {
    const {id} = event.target;
    let selectedDocumentData = this.props.stateProp.userDocs.search[id];

    this.props.documentActions.preparePageForEdit(selectedDocumentData);
    this.context.router.push({
      pathname: '/docs/edit/search/' + selectedDocumentData._id
    });
  }

  render() {
    const {query: {q}} = this.props.location;
    const {
      userDocs: {
        search,
        lazyLoading,
        deleteDoc
      },
      userState: {userData}
    } = this.props.stateProp;

    return (
      <div className='row'>
        <Header
          searchEvent={this.props.searchEvent}
          signInEvent={this.props.logoutEvent}
          status/>
        <SideNav
          userData={userData}/>
        <UserContentPage
          header={`Found ${search.length} Result(s) for ${q}`}
          doc={search}
          cardType='search'
          deleteEvent={this.props.confirmDelete}
          userId={userData._id}
          lazyLoading={!lazyLoading}
          editCard={this.prepareStoreForEdit}
        />
        <DeleteModal
          docData={deleteDoc}
          deleteEvent={this.props.deleteDoc}/>
      </div>
    );
  }
}

Search.propTypes = {
  documentActions: PropTypes.object,
  deleteDoc: PropTypes.func,
  location: PropTypes.object,
  confirmDelete: PropTypes.func,
  stateProp: PropTypes.object,
  searchActions: PropTypes.object,
  logoutEvent: PropTypes.func
};

Search.contextTypes = {
  router: PropTypes.object
};

export default DocController(Search);