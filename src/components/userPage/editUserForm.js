import {Input, Row} from 'react-materialize';
import React, {PropTypes} from 'react';
import Preloader from '../common/loader';
import {SelectComponent} from '../common/input';

const EditUserForm = ({
  preloader,
  submitAction,
  changeHandler,
  userData,
  selectData,
  displayFeedBack,
  feedBack,
  feedBackColor,
  formSubmit
}) => {
  if (Object.keys(userData).length) {
    const {name: {firstname, lastname}, email, role: {_id: role}, username, _id} = userData;
    return (
      <div className='edit-form-container'>
        <form id={_id} onSubmit={submitAction}>
          <div className='row'>
            <div className='user-icon'>
              <i className='material-icons'>perm_identity</i>
            </div>
          </div>
          <Row>
            <Input
              s={6}
              id='firstname'
              name='firstname'
              label='First Name'
              validate
              defaultValue={firstname}
              onChange={changeHandler}/>
            <Input
              s={6}
              name='lastname'
              id='lastname'
              label='Last Name'
              validate
              defaultValue={lastname}
              onChange={changeHandler}/>
          </Row>
          <Row>
            <Input
              s={6}
              name='username'
              id='username'
              label='Username'
              validate
              defaultValue={username}
              onChange={changeHandler}/>
            <SelectComponent
              name='role'
              id='role'
              addedClass='row'
              size={6}
              selectData={selectData}
              selectedValue={role}
              onChangeEvent={changeHandler}/>
          </Row>
          <Row>
            <Input
              s={12}
              name='email'
              id='email'
              label='Email'
              validate
              defaultValue={email}
              onChange={changeHandler}/>
          </Row>
          <span
            style={{display: displayFeedBack, color: feedBackColor}}
            className='edit-user-error'>{feedBack}</span>
          <Preloader
            showLoader={preloader}
            size='small'
            position='left'/>
          <button
            disabled={formSubmit}
            className='btn custom-create-btn right'>Update
          </button>
        </form>
      </div>
    );
  } else {
    return (<div>Loading...</div>);
  }

};

EditUserForm.propTypes = {
  preloader: PropTypes.bool,
  changeHandler: PropTypes.func,
  userData: PropTypes.object,
  selectData: PropTypes.array,
  displayFeedBack: PropTypes.string,
  feedBack: PropTypes.string,
  feedBackColor: PropTypes.string,
  formSubmit: PropTypes.bool,
  submitAction: PropTypes.func
};

export default EditUserForm;
