import React, {PropTypes} from 'react';

const DeleteModal = ({docData, deleteEvent}) => {
  const {title, content} = docData;

  return (
    <div id='deleteDocModal' className='modal modal-fixed-footer'>
      <div className='modal-content'>
        <h4 className='custom-blue-text'>Are you sure you want to detele: {title}?</h4>
        <p dangerouslySetInnerHTML={{__html: content}}/>
      </div>
      <div className='modal-footer'>
        <a className='close-delete-modal modal-action modal-close waves-effect waves-green btn-flat'>No</a>
        <a onClick={deleteEvent}
           className='delete-doc-modal modal-action waves-effect waves-red btn-flat'>Yes</a>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  docData: PropTypes.object,
  deleteEvent: PropTypes.func
};

export default DeleteModal;
