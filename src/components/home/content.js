import React from 'react';
import Description from './description';
import SignUpComponent from './signUpComponent';
import SignInComponent from './signInComponent';

const HomeContent = ({toggleSignUp}) => {
  return (
    <div className='info-container'>
      <Description/>
      <div className='form-container'>
        <SignUpComponent
          toggleSignUp={toggleSignUp}/>
        <SignInComponent
          toggleSignUp={toggleSignUp}/>
      </div>
    </div>
  );
}

export default HomeContent;
