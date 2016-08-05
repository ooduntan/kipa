import React from 'react';
import CardGroup from './cardDisplay';
import documentCover from '../../images/coverPlaceHolder.jpg';

const populateCard = ({cardData}) => {
  console.log(cardData.length, 'ljlljljkjghkhg');
  if (cardData.length) {
    return cardData.map((eachDocs, index) => {
      const {_id, title, creator, createdAt, content} = eachDocs;
      return (
        <CardGroup
          key={_id}
          id={_id}
          docIndex={index}
          cardCorver={documentCover}
          cardTitle={title}
          cardCreator={creator}
          docDate={moment(createdAt).fromNow()}
          editCard={this.editDoc}
          currentUserId={this.props.stateProp.currentUser._id}
          deleteCard={this.deleteDoc}
          confirmDelete={this.confirmDelete}
          cardContent={content}/>
      );
    });
  } else {
      return (
      <div>Oops!!! Sorry you don't any content at the moment</div>
    );
  }
}
