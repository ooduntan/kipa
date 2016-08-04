import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router'
import SideNav from './sideNav';
import * as documentActions from '../../actions/documentAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from '../common/header';
import UserContentPage from './userContentPage';

class Search extends Component {
  constructor(context) {
    super();

    this.logout = this.logout.bind(this);
    this.searchDoc = this.searchDoc.bind(this);
    this.changeUserContent = this.changeUserContent.bind(this);
  }

  searchDoc(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
      let searchValue = event.target.value;

    }
  }

  componentWillMount() {
    if (!window.localStorage.getItem('token')) {
      this.context.router.push('/');
    } else {
      this.props.documentAction.getComponentResources(this.props.currentUser);
    }
  }

	componentWillReceiveProps(nextProps) {
    if (nextProps.userDocs.redirect) {
      this.context.router.push('/');
    }
  }

  changeUserContent(location) {
    if (typeof location === 'object') {
      location = location.currentTarget.id;
    }

    this.props.documentAction.showMenuContent(location);
  }

  logout(event) {
    event.preventDefault();
    window.localStorage.removeItem('token');
    this.context.router.push('/');
  }

  render() {
    return (
      <div className='row'>
        <Header
          searchFunction={this.searchDoc}
          clickEvent={this.logout}
          status='LOGOUT'/>
        <SideNav
          navigator={this.changeUserContent}
          userData={this.props.currentUser}/>
        <UserContentPage
          navigator={this.changeUserContent}
          userDocs={this.props.userDocs.doc}/>
      </div>
    );
  }
}

Search.contextTypes = {
  router: PropTypes.object
}

function mapDispatchToProps(dispatch) {
  return {
    documentAction: bindActionCreators(documentActions, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.users.userData,
    userDocs: state.docStates
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
