import SideNav from './sideNav';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Header from '../common/header';
import {bindActionCreators} from 'redux';
import UserContentPage from './userContentPage';
import React, {PropTypes, Component} from 'react';
import * as searchAction from '../../actions/searchAction';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchTerm: ''
    }
    this.dispatchSearchFunction = this.dispatchSearchFunction.bind(this);
  }

  dispatchSearchFunction(event) {
    const {value, key} = event.target.value;
    const {role} = this.props.currentUser;

    if (key === 'Enter') {
      //this.props.searchActions.searchDocument(q, role);
    }
    this.state.searchTerm = value;
    console.log(this.state);
  }

  componentDidMount() {
    const {role} = this.props.currentUser;
    const {query: {q}} = this.props.location;
    this.props.searchActions.searchDocument(q, role);
  }

  render() {
    const {query: {q}, state: {logout}} = this.props.location;
    return (
      <div className='row'>
        <Header
          searchFunction={this.dispatchSearchFunction}
          clickEvent={logout}
          status='LOGOUT'/>
        <SideNav
          header={`Search ${q}`}
          docs={this.userDocs.search}
          userData={this.props.currentUser}/>
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
  return {
    currentUser: state.users.userData,
    userDocs: state.docStates
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
