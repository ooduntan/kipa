import React from 'react';
import {Link} from 'react-router';

const Logout = ({status, logoutEvent}) => {
  let text = status ? 'LOGOUT' : 'SIGN IN';
  return(
    <li activeClassName='active'>
      <Link onClick={logoutEvent} to='#'>
        {text}
      </Link>
    </li>
  );
}

export default Logout;
