import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CardGroup = ({
  id,
  viewDoc,
  cardCorver,
  cardTitle,
  cardCreator,
  docDate,
  cardType,
  confirmDelete,
  docIndex,
  currentUserId,
  cardContent
}) => {
  let deleteButton;
  if (cardCreator._id === currentUserId) {
    deleteButton = (
      <i id={docIndex}
         onClick={confirmDelete}
         className='material-icons delete-color modal-trigger custom-icon'>
        delete
      </i>
    );
  }

  return (
    <div key={id} className='card hoverable document-cards'>
      <div className='card-image waves-effect waves-block waves-light'>
        <img className='activator' src={cardCorver}/>
      </div>
      <div className='card-content custom-doc-card'>
        <i className='material-icons activator right'>more_vert</i>
        <span className='card-title activator truncate custom-blue-text '>
          {cardTitle}
        </span>
        <p>
          <span>Created by: <span className='username'>{cardCreator.username}</span> | </span>
          <span className='grey-text'>{docDate}</span>
        </p>
      </div>
      <div className='card-action action-card-custom'>
        {deleteButton}
        <Link to={`/docs/edit/${cardType}/${id}`}>
          <i className='material-icons modal-trigger custom-icon'>
            edit
          </i>
        </Link>
        <i
          id={docIndex}
          onClick={viewDoc}
          className='material-icons modal-trigger custom-icon right'>
          open_in_new
        </i>
      </div>
      <div className='card-reveal'>
        <span className='card-title grey-text text-darken-4'>{cardTitle}
          <i className='material-icons right'>close</i>
        </span>
        <p dangerouslySetInnerHTML={{__html: cardContent}}/>
      </div>
    </div>
  );
};

CardGroup.propTypes = {
  id: PropTypes.number,
  docData: PropTypes.string,
  docDate: PropTypes.string,
  cardType: PropTypes.string,
  cardCorver: PropTypes.string,
  confirmDelete: PropTypes.func,
  docIndex: PropTypes.number,
  currentUserId: PropTypes.number,
  cardTitle: PropTypes.string.isRequired,
  cardCreator: PropTypes.object.isRequired,
  docdate: PropTypes.string,
  cardContent: PropTypes.string.isRequired
};

export default CardGroup;
