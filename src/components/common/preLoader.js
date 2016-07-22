import React, {PropTypes} from 'react';

const Preloader = ({showLoader}) => {
  let displayLoader = {display: 'block'};

  if (showLoader) {
    displayLoader = {display: 'none'}
  }
  
  return (
    <div style={displayLoader}>
      <div className='preloader-wrapper big active custom-spin'>
        <div className='spinner-layer spinner-blue-only custom-spin-color'>
          <div className='circle-clipper left'>
            <div className='circle'></div>
          </div><div className='gap-patch'>
            <div className='circle'></div>
          </div><div className='circle-clipper right'>
            <div className='circle'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

Preloader.propTypes = {
  showLoader: PropTypes.string.isRequired
}

export default Preloader;
