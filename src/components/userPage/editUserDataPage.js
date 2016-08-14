import React, {PropTypes, Component} from "react";
import EditUserForm from "./editUserForm";
import SideNav from "./sideNav";
import Header from "../common/header";
import {DocController} from "../common/documentController";

export class EditUserComponent extends Component {
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
    const {userData: {_id}} = this.props.stateProp.userState;

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
      userState: {
        userData,
        feedBack,
        displayFeedBack,
        feedBackColor,
        editPreLoader,
        editFormState
      },
      roles: {roles}
    } = this.props.stateProp;

    return (
      <div>
        <Header
          searchEvent={this.props.searchEvent}
          signInEvent={this.props.logoutEvent}
          status/>
        <SideNav
          roles={roles}
          userData={userData}/>
        <div className='content-container'>
          <div className='headerClass'>Edit Profile</div>
          <EditUserForm
            preloader={editPreLoader}
            userData={userData}
            submitAction={this.onSubmitEditForm}
            selectData={roles}
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

EditUserComponent.propTypes = {
  stateProp: PropTypes.object,
  userActions: PropTypes.object,
  logoutEvent: PropTypes.func
};

export default DocController(EditUserComponent);
