import React from 'react';
import {Link} from 'react-router';

class NotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <div className='nav-wrapper custom-blue'>
            <Link to='/'>
              <div className='logo-name left white-text font-effect-mitosis left-align'>Kipa</div>
            </Link>
          </div>
        </nav>
        <div className='not-found'>Ooops!!! We can't find what you are looking for</div>
      </div>
    );
  }
}

export default NotFoundPage;