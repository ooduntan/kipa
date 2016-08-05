import React from 'react';

const Fab = ({clickEvent}) => {
  return (
    <div className='fab'>
      <a onClick={clickEvent}
        className='btn-floating btn-large waves-effect waves-light'>
        <i className='material-icons'>add</i>
      </a>
    </div>
  );
}

export default Fab;
