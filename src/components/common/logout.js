import React, {PropTypes} from "react";
import {Link} from "react-router";

const Logout = ({status, logoutEvent}) => {
  let text = status ? 'LOGOUT' : 'SIGN IN';
  return (
    <li activeClassName='active'>
      <Link onClick={logoutEvent} to='#'>
        {text}
      </Link>
    </li>
  );
};

Logout.propTypes = {
  status: PropTypes.bool.isRequired,
  logoutEvent: PropTypes.func.isRequired
};

export default Logout;
