// (function() {
//   'use strict';

  import React, { PropTypes } from 'react';
  import Header from './common/Header';

  class Home extends React.Component {
    render() {
      return(
        <div>
          <Header/>
          {this.props.children}
        </div>
      );
    }
  }

  Home.propTypes = {
    children: PropTypes.object.isRequired
  }

  export default Home;

// }())
