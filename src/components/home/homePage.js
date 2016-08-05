import React, {Component, PropTypes} from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import HomeContent from './content';

class Homepage extends Component {
  constructor() {
    super();

    this.toggleSignUp = this.toggleSignUp.bind(this);
  }

  toggleSignUp(dom) {
    $(dom).slideUp( 'slow', function() {
      if (dom.className === 'signup-container') {
         return $('.' + dom.className).prev().slideDown('fast');
      }

      return $('.' + dom.className).next().slideDown('fast');
    });
  }

  componentWillMount() {
    if (window.localStorage.getItem('token')) {
      this.context.router.push('/owned-docs');
    }
  }

  render() {
    return (
      <div>
        <Header
          clickEvent={this.toggleSignUp}
          />
        <HomeContent
          toggleSignUp={this.toggleSignUp}
          />
        <Footer/>
      </div>
    );
  }
}
Homepage.contextTypes = {
  router: PropTypes.object
}

export default Homepage;
