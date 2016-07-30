import React, {Component, PropTypes} from 'react';
import Header from '../common/header';
import HomeContent from './content';

class Homepage extends Component {
  constructor() {
    super();
  }

  toggleSignUp(event) {
    event.preventDefault();
    console.log('this is working as expected');
  }

  componentWillMount() {
    if (window.localStorage.getItem('token')) {
      this.context.router.push('/dashboard');
      console.log('the problem iss form here');
    }
  }

  render() {
    return (
      <div>
        <Header
          clickEvent={this.toggleSignUp}
          status='SIGN UP'
          />
        <HomeContent/>
      </div>
    );
  }
}
Homepage.contextTypes = {
  router: PropTypes.object
}

export default Homepage;
