import React, {PropTypes} from "react";

const Preloader = ({showLoader, size, position}) => {
  let displayLoader = showLoader ? {display: 'none'} : {display: 'block'};

  return (
    <div className={position} style={displayLoader}>
      <div className={`preloader-wrapper ${size} active custom-spin`}>
        <div className='spinner-layer spinner-blue-only custom-spin-color'>
          <div className='circle-clipper left'>
            <div className='circle'></div>
          </div>
          <div className='gap-patch'>
            <div className='circle'></div>
          </div>
          <div className='circle-clipper right'>
            <div className='circle'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

Preloader.propTypes = {
  showLoader: PropTypes.bool.isRequired,
  position: PropTypes.string,
  size: PropTypes.string
};

export default Preloader;
