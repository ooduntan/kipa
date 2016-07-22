import React from 'react';
import {Link} from 'react-router'

const Header = ({ndfknf, dkfjkjdf})=> {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper custom-blue">
            <a href="#!" className="brand-logo">DocKip</a>
            <a href="#" d ata-activates="mobile-demo" className="button-collapse">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li activeClassName='active'>
                <Link to="about">THE APP</Link>
              </li>
              <li activeClassName='active'>
                <Link to="the-app">HOW IT WORKS</Link>
              </li>
              <li activeClassName='active'>
                <Link to="#">SIGN IN</Link>
              </li>
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

const {name, age} = {
  name: 'kdjfkfd',
  age: 28,
  school: 'jknkdfn'
};

export default Header;
