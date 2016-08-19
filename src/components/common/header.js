import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import SearchField from './searchField';
import Logout from './logout';

const Header = ({status, logoutEvent, searchEvent}) => {
  $( document ).ready(function() {
    $(".button-collapse").sideNav();
  });
  
  return (
    <div className='navbar-fixed'>
      <nav>
        <div className='nav-wrapper custom-blue'>
          <Link to='/' data-activates='mobile-demo' className='button-collapse'>
            <div className='logo-name left white-text font-effect-mitosis left-align'>Kipa</div>
          </Link>
          <Link to='/' data-activates='mobile-demo' className='button-collapse'>
            <i className='material-icons'>menu</i>
          </Link>
          {status ? <SearchField searchEvent={searchEvent}/> : ''}
          <ul className='right'>
            {status ? <Logout status={status} logoutEvent={logoutEvent}/> : ''}
          </ul>
          <ul className='side-nav' id='mobile-demo'>
            <Link to='/d'>My document</Link>
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
