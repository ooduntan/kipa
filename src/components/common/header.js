import React, {PropTypes} from 'react';
import {Link} from 'react-router'

const Header = ({clickEvent, status}) => {
  let logoutTag = '';
  if (status) {
    logoutTag = (
      <li activeClassName='active'>
      <Link onClick={clickEvent} to="#">
        {status}
      </Link>
    </li>
  );
  }
  return(
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper custom-blue">
          <div className='logo-name left white-text font-effect-mitosis left-align'> DocKip </div>
          <a href="#" d ata-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li activeClassName='active'>
              <Link to="about" activeClassName='active'>THE APP</Link>
            </li>
            <li activeClassName='active'>
              <Link to="the-app" activeClassName='active'>HOW IT WORKS</Link>
            </li>
            {logoutTag}
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li>
              <Link to="about">THE APP</Link>
            </li>
            <li>
              <Link to="the-app">HOW IT WORKS</Link>
            </li>
            <li>
              <Link to="#">SIGN IN</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

Header.PropTypes = {
  clickEvent: PropTypes.func,
  status: PropTypes.string
}

export default Header;
