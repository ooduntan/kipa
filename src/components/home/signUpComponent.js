import React from 'react';
import {connect} from 'react-redux';
import * as userAction from '../../actions/userAction';
import {bindActionCreators} from 'redux';
import SignUpForm from './signUpForm';

class SignUpComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      emailError: false,
      confirmPasswordError: false,
      passwordError: false,
      submitResult: false
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.isValidEmail = this.isValidEmail.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay(event) {
    event.preventDefault();
    this.props.toggleSignUp(this.refs.signUpComponent);
  }

  onChangeHandler(event) {
    console.log(event);
    this.state.user[event.target.name] = event.target.value;
    this.setState({user: this.state.user});
    console.log(this.state);
  }

  isValidEmail(value) {
    return /\w+@\w+\.\w+/g.test(value);
  }

  isFormValid() {
    if (!this.state.confirmPasswordError
      && !this.state.emailError
      && !this.state.passwordError) {
      return true;
    }

    return false;
  }

  validateEmail(event) {
    let value = event.target.value;

    if (this.isValidEmail(value)) {
      return this.setState({emailError: false});
    }

    return this.setState({emailError: true});
  }

  confirmPassword(event) {
    let value = event.target.value;

    if (this.state.user.password === this.state.user.confirmPassword) {
      return this.setState({confirmPasswordError: false});
    }

    return this.setState({confirmPasswordError: true});
  }

  validatePassword(event) {
    const value = event.target.value;

    this.confirmPassword(event);
    if (/(\w|\W|\d|\S|\s){6,}/.test(value)) {
      return this.setState({passwordError: false});
    }

    return this.setState({passwordError: true});
  }

  saveUser(event) {
    event.preventDefault();
    if (!this.isFormValid()) {
      return false;
    }

    this.props.actions.saveUserData(this.state.user);
  }

  render() {
    if (this.props.users.success) {
      Materialize.toast('Account successfully created', 4000)
    }
    return (
      <div ref='signUpComponent' className='hide-element'>
        <div className='signup-wrapper'>
          <div>Sign up for free</div>
          <div className='small-signup-text'>
            Create a free DocKip account
          </div>
        </div>
        <div className="row">
          <SignUpForm
            changeHandler={this.onChangeHandler}
            saveAction={this.saveUser}
            emailHasError={this.state.emailError}
            emailIsValid={this.validateEmail}
            passwordIsVslid={this.validatePassword}
            passwordHasError={this.state.passwordError}
            matchPasswordError={this.state.confirmPasswordError}
            showLoader={this.props.users.displayLoader}
            roles={this.props.roles}
            matchPassword={this.confirmPassword}/>
        <a className='custom-link'
          onClick={this.toggleDisplay}>
          Existing user? Sign in
        </a>
      </div>
    </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userAction, dispatch)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    users: state.users,
    roles: state.roleState.roles
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
