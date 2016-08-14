import React, {PropTypes} from "react";

const Fab = ({clickEvent}) => {
  return (
    <div className='fab'>
      <a onClick={clickEvent}
         className='btn-floating btn-large waves-effect waves-light'>
        <i className='material-icons'>add</i>
      </a>
    </div>
  );
};

Fab.propTypes = {
  clickEvent: PropTypes.func.isRequired
};

export default Fab;
