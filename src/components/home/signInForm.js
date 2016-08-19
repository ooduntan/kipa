import React, {PropTypes} from 'react';
import {InputComponent, ButtonComponent} from '../common/input';

const SignInForm = ({
  changeHandler,
  signInAction,
  showLoader,
  errorMessage
}) => {
  return (
    <form
      onSubmit={signInAction}
      className='form-container-space'>
      <div className='row'>
        <InputComponent
          name='username'
          type='text'
          id='username'
          label='Username'
          newClass='s12 form-spacing'
          onChangeEvent={changeHandler}/>
      </div>
      <div className='row'>
        <InputComponent
          name='password'
          type='password'
          id='password'
          label='Password'
          newClass='s12 form-spacing'
          onChangeEvent={changeHandler}/>
      </div>
      <div className={`progress custom-loader ${showLoader}`}>
        <div className='indeterminate'></div>
      </div>
      <div className='error-span-position error-span'>{errorMessage}</div>
      <ButtonComponent
        text='SIGN IN'
        name='sign-in'
        newClass='custom-green custom-btn submit-button-spacing'/>
    </form>
  );
};

SignInForm.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  signInAction: PropTypes.func.isRequired,
  showLoader: PropTypes.string,
  errorMessage: PropTypes.string,
  displayForm: PropTypes.bool
};

export default SignInForm;
