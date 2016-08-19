import React, {PropTypes} from 'react';
import moment from 'moment';

const ViewDocModal = ({docData, editEvent}) => {
  const {title, content, creator: {username}, createdAt}= docData;

  return (
    <div id='editDocModal' className='modal modal-fixed-footer'>
      <div className='modal-content'>
        <h4 className='custom-blue-text'>{title}</h4>
        <p>{content}</p>
      </div>
      <div className='modal-footer'>
        <span>Created by: <span className='username'>{username}</span> | </span>
        <span className='grey-text'>{moment(createdAt).fromNow()}</span>
        <a className='close-delete-modal modal-action modal-close waves-effect waves-green btn-flat'>Close</a>
        <a id={docData.index} onClick={editEvent}
           className='modal-action waves-effect btn-flat'>Edit</a>
      </div>
    </div>
  );
};

ViewDocModal.propTypes = {
  docData: PropTypes.object,
  deleteEvent: PropTypes.func
};

export default ViewDocModal;
