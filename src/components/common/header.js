import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router'

class Header extends Component {
  constructor() {
    super();

    this.logout =this.logout.bind(this);
    this.searchDoc = this.searchDoc.bind(this);
  }

  logout(event) {
    event.preventDefault();
    window.localStorage.removeItem('token');
    this.context.router.push('/');
  }

  searchDoc(event) {
    let searchValue = event.target.value;
    if (event.key === 'Enter') {
      this.context.router.push({
        pathname: 'search',
        query: {q: searchValue},
        state: {logout: this.logout}
      });
      return;
    }
  }

   render() {
     let logoutTag, search = '';
     if (status) {
       search = (
           <div className='input-field custom-nav-bar'>
             <input
               id='search'
               placeholder='Search'
               type='search'
               onKeyPress={this.searchDoc}
               required/>
             <label for='search'><i className='material-icons'>search</i></label>
             <i className='material-icons'>close</i>
           </div>
       );
       logoutTag = (
         <li activeClassName='active'>
           <Link onClick={this.logout} to='#'>
             {status}
           </Link>
         </li>
       );
     }
     return(
       <div className='navbar-fixed'>
         <nav>
           <div className='nav-wrapper custom-blue'>
             <div className='logo-name left white-text font-effect-mitosis left-align'> DocKip </div>
             <a href='#' d ata-activates='mobile-demo' className='button-collapse'>
               <i className='material-icons'>menu</i>
             </a>
             {search}
             <ul className='right hide-on-med-and-down'>
               <li activeClassName='active'>
                 <Link to='about' activeClassName='active'>THE APP</Link>
               </li>
               <li activeClassName='active'>
                 <Link to='the-app' activeClassName='active'>HOW IT WORKS</Link>
               </li>
               {logoutTag}
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
   }

}

Header.PropTypes = {
  clickEvent: PropTypes.func,
  status: PropTypes.string
}

Header.contextTypes = {
  router: PropTypes.object
}

export default Header;
