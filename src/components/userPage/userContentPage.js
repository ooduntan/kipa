import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import CardGroup from './cardDisplay';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as documentAction from '../../actions/documentAction';
import documentCover from '../../images/coverPlaceHolder.jpg';
import Preloader from '../common/Preloader';

class UserContentPage extends Component {
  constructor() {
    super();
    this.populateCard = this.populateCard.bind(this);
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    console.log('I just recieved new props');
    console.log(nextProps);
  }

  showPageContent() {
    const {sharedDocs, success, docs, header} = this.props.docStates.userDocs;
    switch (header) {
      case 'MY DOCUMENTS':
        return this.populateCard(docs, success);
        break;
      case 'SHARED DOCUMENTS':
        console.log('call from shared docs');
        return this.populateCard(sharedDocs.doc, success);
        break;
      case 'EDIT PROFILE':
        return this.displayEditPage();
        break;
      default:

    }
  }

  fabClick(e){
    e.preventDefault();
    $('#modal1').openModal();
  }

  displayEditPage() {
    return <div>This is edit page</div>
  }

  populateCard(cardData, successState){
    if (successState && cardData.length > 0) {
      console.log(cardData);
      return cardData.map((eachDocs) => {
        const {_id, title, creator, createdAt, content} = eachDocs;
        return (
          <CardGroup
            key={_id}
            cardCorver={documentCover}
            cardTitle={title}
            cardCreator={creator}
            docDate={createdAt}
            cardContent={content}/>
        );
      })
    }

    return (<div>Oops!!! Sorry you don't any content at the moment</div>);
  }

  render() {
    return (
      <div className='content-container'>
        <div
          className='headerClass'>
          {this.props.docStates.userDocs.header}
        </div>
        <Preloader
          showLoader={this.props.docStates.userDocs.success}/>
        {this.showPageContent()}
        <div className='fab'>
          <a onClick={this.fabClick} className='btn-floating btn-large waves-effect waves-light'>
            <i className='material-icons'>add</i>
          </a>
        </div>
      </div>
    );
  }
}

UserContentPage.propTypes = {
  userDocs: PropTypes.array
}

function mapDispatchToProps(dispatch) {
  return{
    userActions: bindActionCreators(documentAction, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    docStates: {
      currentUser: state.users.userData,
      userDocs: state.docStates
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContentPage);
