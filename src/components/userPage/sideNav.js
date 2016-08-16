import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import userImage from '../../images/testImage.jpg';
import Preloader from '../common/loader';

const SideNav = ({userData}) => {
  if (!Object.keys(userData).length) {
    return (
      <Preloader
        size='big'
        position='page-preloader'
        showLoader={false}/>
    );
  } else {
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
      <ul id='nav-mobile' className='side-nav fixed'>
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
    );
  }
};

SideNav.propTypes = {
  userData: PropTypes.object.isRequired
};

export default SideNav;
