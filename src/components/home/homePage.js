import React, {Component, PropTypes} from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import HomeContent from './content';
import {DocController} from '../common/documentController';

export class Homepage extends Component {
  constructor() {
    super();

    this.toggleSignUp = this.toggleSignUp.bind(this);
  }

  componentWillMount() {
    if (window.localStorage.getItem('token')) {
      this.context.router.push('/owned-docs');
    }
  }

  toggleSignUp(dom) {
    $(dom).slideUp('slow', function () {
      if (dom.className === 'signin-container') {
        return $('.signup-container').slideDown('fast');
      }

      return $('.signin-container').slideDown('fast');
    });
  }

  render() {
    return (
      <div>
        <nav>
          <div className='nav-wrapper custom-blue'>
            <div className='logo-name left white-text font-effect-mitosis left-align'>Kipa</div>
          </div>
        </nav>
        <HomeContent
          {...this.props}
          toggleSignUp={this.toggleSignUp}
        />
        <Footer/>
      </div>
    );
  }
}
Homepage.contextTypes = {
  router: PropTypes.object
};

export default DocController(Homepage);
