import React from 'react';
import userImage from '../../images/testImage.jpg';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <ul id="nav-mobile" className="side-nav fixed">
          <li>
            <div className='logo-name font-effect-mitosis left-align'>DocKip</div>
          </li>
          <li>
            <div className='user-info-container'>
              <div>
                <img className='user-image' src={userImage}/>
              </div>
              <div className='username-text center-align'><span>Oduntan,</span> Oluwatobiloba Steohen</div>
              <div className=' center-align'>Tobolowoski</div>
              <div className='custom-blue-text center-align'>stephen.oduntan@andela.com</div>
            </div>
          </li>
          <li className="bold"><a href="about.html" className="waves-effect waves-teal">About</a></li>
          <li className="bold"><a href="getting-started.html" className="waves-effect waves-teal">Getting Started</a></li>
          <li className="no-padding">
            <ul className="collapsible collapsible-accordion">
              <li className="bold"><a className="collapsible-header  waves-effect waves-teal">CSS</a>
                <div className="collapsible-body">
                  <ul>
                    <li><a href="color.html">Color</a></li>
                    <li><a href="grid.html">Grid</a></li>
                    <li><a href="helpers.html">Helpers</a></li>
                    <li><a href="media-css.html">Media</a></li>
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="shadow.html">Shadow</a></li>
                    <li><a href="table.html">Table</a></li>
                    <li><a href="typography.html">Typography</a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
          <li className="bold"><a href="http://materializecss.com/mobile.html" className="waves-effect waves-teal">Mobile</a></li>
          <li className="bold"><a href="showcase.html" className="waves-effect waves-teal">Showcase</a></li>
        </ul>
      </div>
    );
  }
}

export default Dashboard;
