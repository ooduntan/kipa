import React, {PropTypes, Component} from 'react';
import moment from 'moment';
import CardGroup from '../common/cardDisplay';
import Preloader from '../common/loader';
import documentCover from '../../images/coverPlaceHolder.jpg';


const UserContentPage = ({
  lazyLoading,
  viewEvent,
  doc,
  header,
  cardType,
  editCard,
  deleteEvent,
  userId
}) => {
  let cards = '';

  if (doc.length) {
    cards = doc.map((eachDocs, index) => {
      const {_id, title, creator, createdAt, content} = eachDocs;

      return (
        <CardGroup
          key={_id}
          id={_id}
          docIndex={index}
          cardType={cardType}
          cardCorver={documentCover}
          cardTitle={title}
          editCard={editCard}
          cardCreator={creator}
          viewDoc={viewEvent}
          docDate={moment(createdAt).fromNow()}
          currentUserId={userId}
          confirmDelete={deleteEvent}
          cardContent={content}/>
      );
    });
  } else {
    cards = (
      <div className='center'>Oops!!! Sorry you don't any content at the moment</div>
    );
  }

  return (
    <div className='content-container'>
      <div className='header-class'>
        {header}
      </div>
      <div style={{clear: 'both', overflow: 'auto'}}>
        {cards}
      </div>
      <Preloader
        showLoader={lazyLoading}/>
    </div>
  );
};

UserContentPage.propTypes = {
  userDocs: PropTypes.array,
  lazyLoading: PropTypes.bool,
  doc: PropTypes.array,
  header: PropTypes.string,
  cardType: PropTypes.string,
  editCard: PropTypes.func,
  deleteEvent: PropTypes.func,
  userId: PropTypes.number
};

export default UserContentPage;
