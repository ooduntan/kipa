import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CardGroup = ({
  id,
  cardCorver,
  cardType,
  cardTitle,
  cardCreator,
  docDate,
  editCard,
  deleteCard,
  confirmDelete,
  docIndex,
  currentUserId,
  cardContent}) => {
    let deleteButton;

    if (cardCreator === currentUserId) {
      deleteButton = (
        <i id={`${cardType}__${docIndex}`}
          onClick={confirmDelete}
          className='material-icons delete-color modal-trigger custom-icon'>
          delete
        </i>
      );
    }

  return (
    <div className='card hoverable document-cards'>
      <div className='card-image waves-effect waves-block waves-light'>
        <img className='activator' src={cardCorver}/>
      </div>
      <div className='card-content custom-doc-card'>
        <i className='material-icons activator right '>more_vert</i>
        <span className='card-title activator truncate custom-blue-text '>
          {cardTitle}
        </span>
        <p>
          <span>Created by: {cardCreator} | </span>
          <span className='grey-text'>{docDate}</span>
        </p>
      </div>
      <div className='card-action action-card-custom'>
        {deleteButton}
        <i
          id={`${cardType}__${docIndex}`}
          onClick={editCard}
          className='material-icons modal-trigger custom-icon'>
          edit
        </i>
      </div>
      <div className='card-reveal'>
        <span className='card-title grey-text text-darken-4'>{cardTitle}
          <i className='material-icons right'>close</i>
        </span>
        <p>{cardContent}</p>
      </div>
    </div>
  );
}

CardGroup.propTypes = {
  cardCorver: PropTypes.string,
  cardTitle: PropTypes.string.isRequired,
  cardCreator: PropTypes.number.isRequired,
  docdate: PropTypes.string,
  cardContent: PropTypes.string.isRequired
}

export default CardGroup;
