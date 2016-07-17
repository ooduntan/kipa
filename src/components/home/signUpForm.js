import {InputComponent, ButtonComponent} from '../common/input';
import React, {PropTypes} from 'react';

const SignUpForm = ({
  changeHandler,
  saveAction,
  emailHasError,
  emailIsValid,
  passwordIsVslid,
  passwordHasError,
  matchPasswordError,
  matchPassword,
  showLoader
}) => {
  return (
    <form onSubmit={saveAction} className='col s12 form-container-space'>
      <div className='row'>
        <InputComponent
          name='firstname'
          type='text'
          id='first_name'
          label='First Name'
          newClass='s6 form-spacing'
          onChangeEvent={changeHandler}/>
        <InputComponent
          name='lastname'
          type='text'
          id='last_name'
          label='Last Name'
          newClass='s6 form-spacing'
          onChangeEvent={changeHandler}/>
      </div>
      <div className='row'>
        <InputComponent
          name='email'
          type='email'
          id='email'
          label='Email'
          newClass='s6 form-spacing'
          errorMessage='Invalid email address'
          inputError={emailHasError}
          validateFunction={emailIsValid}
          onChangeEvent={changeHandler}/>
          <InputComponent
            name='role'
            type='email'
            id='role'
            label='Role'
            newClass='s6 form-spacing'
            onChangeEvent={changeHandler}/>
      </div>
      <div className='row'>
        <InputComponent
          name='username'
          type='text'
          id='username'
          label='User Name'
          newClass='s6 form-spacing'
          onChangeEvent={changeHandler}/>
      </div>
      <div className='row'>
        <InputComponent
          name='password'
          type='password'
          id='password'
          label='Password'
          newClass='s12 form-spacing'
          errorMessage='Password must have six or more characters'
          inputError={passwordHasError}
          validateFunction={passwordIsVslid}
          onChangeEvent={changeHandler}/>
      </div>
      <div className='row'>
        <InputComponent
          name='confirmPassword'
          type='password'
          id='confirm-password'
          label='Confirm Password'
          newClass='s12 form-spacing'
          errorMessage='Password do not match'
          inputError={matchPasswordError}
          validateFunction={matchPassword}
          onChangeEvent={changeHandler}/>
      </div>
      <div className={`${showLoader} progress`}>
        <div className='indeterminate'></div>
      </div>
      <ButtonComponent
        text='SIGN UP'
        name='sign-up'
        newClass='custom-blue custom-btn'/>
    </form>
  );
}

SignUpForm.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  showLoader: PropTypes.string.isRequired,
  saveAction: PropTypes.func.isRequired,
  emailHasError: PropTypes.bool.isRequired,
  emailIsValid: PropTypes.func.isRequired,
  passwordIsVslid: PropTypes.func.isRequired,
  passwordHasError: PropTypes.bool.isRequired,
  matchPasswordError: PropTypes.bool.isRequired,
  matchPassword: PropTypes.func.isRequired,
  showLoader: PropTypes.string.isRequired,
}

export default SignUpForm;
