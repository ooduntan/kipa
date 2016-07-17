import React from 'react';
import Description from './description';
import SignUpComponent from './signUpComponent';
import SignInComponent from './signInComponent';

const HomeContent = () => {
  return (
    <div className='info-container'>
      <Description/>
      <div className='form-container'>
        <SignUpComponent/>
        <SignInComponent/>
      </div>
    </div>
  );
}

export default HomeContent;
