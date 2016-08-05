import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import PopulateCard from '../common/populateCard';
import {connect} from 'react-redux';
import {DropDown} from '../common/input';
import moment from 'moment';
import CardGroup from '../common/cardDisplay';
import {bindActionCreators} from 'redux';
import * as documentAction from '../../actions/documentAction';
import Preloader from '../common/preloader';
import EditUserComponent from './editUserDataPage';
import documentCover from '../../images/coverPlaceHolder.jpg';
import EditDocument from './editDocument';


const UserContentPage = ({doc, header, cardType, editCard, deleteEvent, userId}) => {
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
          docDate={moment(createdAt).fromNow()}
          currentUserId={userId}
          confirmDelete={deleteEvent}
          cardContent={content}/>
      );
    });
  } else {
      cards = (
      <div>Oops!!! Sorry you don't any content at the moment</div>
    );
  }

    return (
      <div className='content-container'>
        <div className='headerClass'>
          {header}
        </div>
        {cards}
      </div>
    );
  //}
}

UserContentPage.propTypes = {
  userDocs: PropTypes.array
}


export default UserContentPage;
