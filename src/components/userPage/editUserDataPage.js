import React, {Component} from 'react';
import EditUserForm from './editUserForm';
import {connect} from 'react-redux';
import SideNav from './sideNav';
import Header from '../common/header';
import {bindActionCreators} from 'redux';
import * as userAction from '../../actions/userAction';


class EditUserComponent extends Component {
  constructor() {
    super();
    this.state = {
      userData: {
        firstname: '',
        lastname: '',
        email: '',
        role: '',
        username: ''
      }
    };

    this.OnChangeHandler = this.OnChangeHandler.bind(this);
    this.onSubmitEditForm = this.onSubmitEditForm.bind(this);
  }

  onSubmitEditForm(event) {
    event.preventDefault();
    let updatedUserData = {};
    const {userData} = this.state;
    const {userData: {_id}} = this.props.currentUser;

    for (let key in userData) {
      if (userData[key].length) updatedUserData[key] = userData[key];
    }

    if (Object.keys(updatedUserData).length) {
      this.props.userActions.updateUserData(updatedUserData, _id);
    }
  }

  OnChangeHandler(event) {
    const {name, value} = event.target;
    this.state.userData[name] = value;
    this.props.userActions.activateSubmit();
  }

  render() {
    const {
      userData,
      feedBack,
      displayFeedBack,
      feedBackColor,
      editFormState
    } = this.props.currentUser;

    console.log(this.props);

    return(
      <div>
        <Header/>
        <SideNav
          roles={this.props.roles}
          userData={userData}/>
        <div className='content-container'>
          <div className='headerClass'>Edit Profile</div>
          <EditUserForm
            preloader={this.props.userData.editPreLoader}
            userData={userData}
            submitAction={this.onSubmitEditForm}
            selectData={this.props.roles}
            changeHandler={this.OnChangeHandler}
            displayFeedBack={displayFeedBack}
            feedBack={feedBack}
            feedBackColor={feedBackColor}
            formSubmit={editFormState}/>
        </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.users,
    userData: state.docStates,
    roles: state.roleState.roles
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserComponent);
