// (function() {
//   'use strict';

  import {InputComponent, ButtonComponent} from '../common/input';
  import React from 'react';
  import {connect} from 'react-redux';
  import * as userAction from '../../actions/userAction';

  class SignUpForm extends React.Component {
    constructor() {
      super();
      this.state = {
        user: {},
        emailError: false,
        confirmPasswordError: false,
        passwordError: false
      };

      this.onChangeHandler = this.onChangeHandler.bind(this);
      this.isValidEmail = this.isValidEmail.bind(this);
      this.isFormValid = this.isFormValid.bind(this);
      this.validateEmail = this.validateEmail.bind(this);
      this.confirmPassword = this.confirmPassword.bind(this);
      this.saveUser = this.saveUser.bind(this);
      this.validatePassword = this.validatePassword.bind(this);
    }

    onChangeHandler(event) {
      this.state.user[event.target.name] = event.target.value;
      this.setState({user: this.state.user});
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
  		 return	this.setState({emailError: false});
  		}

  		return this.setState({emailError: true});
    }

    confirmPassword() {
      let value = event.target.value;

  		if (this.state.user.password === this.state.user.confirmPassword) {
  		  return this.setState({confirmPasswordError: false});
  		}

  		return this.setState({confirmPasswordError: true});
    }

    validatePassword(event) {
      const value = event.target.value;

      this.confirmPassword();
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

      this.props.dispatch(userAction.createUser(this.state.user));
    }

    render() {
      return(
        <form onSubmit = { this.saveUser } className='col s12'>
        	<div className='row'>
        		<InputComponent
        			name='firstName'
			        type='text'
			        id='first_name'
			        label='First Name'
			        newClass = 's6 form-spacing'
			        onChangeEvent={this.onChangeHandler}/>
		       	<InputComponent
		       		name='lastName'
			        type='text'
			        id='last_name'
			        label='Last Name'
			        newClass='s6 form-spacing'
			        onChangeEvent={this.onChangeHandler}/>
		      </div>
		      <div className='row'>
		        <InputComponent
		        	name='email'
			        type='email'
			        id='email'
			        label='Email'
			        newClass='s12 form-spacing'
			        errorMessage='Invalid email address'
			        inputError={this.state.emailError}
			        validateFunction={this.validateEmail}
			        onChangeEvent={this.onChangeHandler}/>
		      </div>
		      <div className='row'>
		        <InputComponent
		        	name='password'
			        type='password'
			        id='password'
			        label='Password'
			        newClass='s12 form-spacing'
              errorMessage='Password must have six or more characters'
              inputError={this.state.passwordError}
			        validateFunction={this.validatePassword}
			        onChangeEvent={this.onChangeHandler}/>
		      </div>
		      <div className='row'>
		        <InputComponent
		        	name='confirmPassword'
			        type='password'
			        id='confirm-password'
			        label='Confirm Password'
			        newClass='s12 form-spacing'
			        errorMessage='Password do not match'
			        inputError={this.state.confirmPasswordError}
			        validateFunction={this.confirmPassword}
			        onChangeEvent={this.onChangeHandler}/>
		      </div>
		      <ButtonComponent
		      	text='SIGN UP'
		        name='sign-up'
		        newClass='custom-blue custom-btn'/>
		    </form>
      );
    }

  }

  function mapStateToProps(state, ownProps) {
    return {
      users: state.users
    }
  }

  export default connect(mapStateToProps)(SignUpForm);

// }());
