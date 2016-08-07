import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import SearchField from './searchField';
import Logout from './logout'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as searchAction from '../../actions/searchAction';

class Header extends Component {
  constructor() {
    super();

    this.searchDoc = this.searchDoc.bind(this);
  }

  searchDoc(event) {
    let searchValue = event.target.value;
    const {role} = this.props.userData

    if (event.key === 'Enter') {
      this.props.searchActions.searchDocument(searchValue, role);
      this.context.router.push({
        pathname: '/search',
        query: {q: searchValue},
      });

      return;
    }
  }

   render() {
     const {status, signInEvent} = this.props;

     return(
       <div className='navbar-fixed'>
         <nav>
           <div className='nav-wrapper custom-blue'>
             <div className='logo-name left white-text font-effect-mitosis left-align'> DocKip </div>
             <Link to='/' data-activates='mobile-demo' className='button-collapse'>
               <i className='material-icons'>menu</i>
             </Link>
             {status ? <SearchField searchEvent={this.searchDoc}/> : ''}
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
   }

}

Header.PropTypes = {
  clickEvent: PropTypes.func,
  status: PropTypes.string
}

Header.contextTypes = {
  router: PropTypes.object
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchAction, dispatch)
  }
}

function mapStateToProps(state) {
  return{
    userData: state.users.userData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
