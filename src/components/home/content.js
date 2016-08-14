import React, {PropTypes} from "react";
import Description from "./description";
import SignUpComponent from "./signUpComponent";
import SignInComponent from "./signInComponent";

const HomeContent = ({toggleSignUp, userActions, stateProp}) => {
  return (
    <div className='info-container'>
      <Description/>
      <div className='form-container'>
        <SignUpComponent
          userActions={userActions}
          stateProp={stateProp}
          toggleSignUp={toggleSignUp}/>
        <SignInComponent
          userActions={userActions}
          stateProp={stateProp}
          toggleSignUp={toggleSignUp}/>
      </div>
    </div>
  );
};

HomeContent.propTypes = {
  userActions: PropTypes.object,
  stateProp: PropTypes.object,
  toggleSignUp: PropTypes.func
};

export default HomeContent;
