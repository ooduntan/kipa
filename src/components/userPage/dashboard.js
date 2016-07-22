import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router'
import SideNav from './sideNav';
import * as documentActions from '../../actions/documentAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserContentPage from './userContentPage';

class Dashboard extends Component {
  constructor(context) {
    super();
  }

  componentWillMount() {
    this.props.documentAction.getComponentResources(this.props.currentUser);
  }

	componentWillReceiveProps(nextProps) {
    //  console.log(this.props);
    // console.log(nextProps);
  }

  render() {
    return (
      <div className='row'>
        <SideNav
          userData={this.props.currentUser}/>
        <UserContentPage
          userDocs={this.props.userDocs.doc}/>
      </div>
    );
  }
}

Dashboard.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
