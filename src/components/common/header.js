import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import SearchField from './searchField';
import Logout from './logout';

const Header = ({status, logoutEvent, searchEvent, userData}) => {
  if(Object.keys(userData).length) {
    const {
      name: {
        firstname,
        lastname
      },
      username,
      role: {
        role
      },
      email
    } = userData;

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
              <li>
                <div
                  className='logo-name custom-blue-text font-effect-mitosis left-align'>
                  Kipa
                </div>
              </li>
              <li>
                <div className='user-info-container'>
                  <div>
                    <i className='user-image material-icons'>perm_identity</i>
                  </div>
                  <div className='username-text center-align'>
                    <span>{lastname},</span> {firstname}
                  </div>
                  <div className='center-align'>{username}</div>
                  <div className='center-align'>
                    {role}
                  </div>
                  <div className='custom-blue-text center-align'>{email}</div>
                </div>
              </li>
              <li id='MY_DOCUMENTS' className='bold'>
                <Link to='/owned-docs'>
                  <div className='custom-div waves-effect'>
                    <i className='sidebar-icon-position material-icons'>description</i>
                    <span>My Documents</span>
                  </div>
                </Link>
              </li>
              <li id='SHARED_DOCUMENTS' className='bold'>
                <Link to='/shared-docs'>
                  <div className='custom-div waves-effect'>
                    <i className='sidebar-icon-position material-icons'>group_work</i>
                    <span>Shared Documents</span>
                  </div>
                </Link>
              </li>
              <li id='EDIT_PROFILE' className='bold'>
                <Link to='/profile/edit'>
                  <div className='custom-div waves-effect'>
                    <i className='sidebar-icon-position material-icons'>mode_edit</i>
                    <span>Edit Profile</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  } else {
    return(<div>Loading...</div>)
  }
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
