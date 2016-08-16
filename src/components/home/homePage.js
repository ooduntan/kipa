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
      if (dom.className === 'signup-container') {
        return $('.' + dom.className).prev().slideDown('fast');
      }

      return $('.' + dom.className).next().slideDown('fast');
    });
  }

  render() {
    return (
      <div>
        <Header
          searchEvent={this.props.searchEvent}
          signInEvent={this.toggleSignUp}
          status={false}/>
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
