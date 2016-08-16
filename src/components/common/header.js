import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import SearchField from "./searchField";
import Logout from "./logout";

const Header = ({status, signInEvent, searchEvent}) => {

  return (
    <div className='navbar-fixed'>
      <nav>
        <div className='nav-wrapper custom-blue'>
          <div className='logo-name left white-text font-effect-mitosis left-align'>Kipa</div>
          <Link to='/' data-activates='mobile-demo' className='button-collapse'>
            <i className='material-icons'>menu</i>
          </Link>
          {status ? <SearchField searchEvent={searchEvent}/> : ''}
          <ul className='right hide-on-med-and-down'>
            <li activeClassName='active'>
              <Link to='about' activeClassName='active'>THE APP</Link>
            </li>
            <li activeClassName='active'>
              <Link to='the-app' activeClassName='active'>HOW IT WORKS</Link>
            </li>
            {status ? <Logout status={status} logoutEvent={signInEvent}/> : ''}
          </ul>
          <ul className='side-nav' id='mobile-demo'>
            <li>
              <Link to='about'>THE APP</Link>
            </li>
            <li>
              <Link to='the-app'>HOW IT WORKS</Link>
            </li>
            <li>
              <Link to='#'>SIGN IN</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

Header.propTypes = {
  clickEvent: PropTypes.func,
  userData: PropTypes.object,
  status: PropTypes.bool,
  signInEvent: PropTypes.func,
  searchActions: PropTypes.object
};

Header.contextTypes = {
  router: PropTypes.object
};

export default Header;
