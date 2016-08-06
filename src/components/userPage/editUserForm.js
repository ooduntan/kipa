import {
  Button,
  Input,
  Card,
  Row,
  Col,
  Dropdown,
  NavItem
} from 'react-materialize';
import React from 'react';
import Preloader from '../common/preloader';
import {
  InputComponent,
  ButtonComponent,
  SelectComponent,
  CheckBox,
  File
} from '../common/input';

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
    const {name: {firstname, lastname}, email, role, username, _id} = userData;
    console.log(formSubmit, 'this is form submit');
    return(
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
              name='firstname'
              label='First Name'
              validate
              defaultValue={firstname}
              onChange={changeHandler}/>
            <Input
              s={6}
              name='lastname'
              label='Last Name'
              validate
              defaultValue={lastname}
              onChange={changeHandler}/>
          </Row>
          <Row>
            <Input
              s={6}
              name='username'
              label='Username'
              validate
              defaultValue={username}
              onChange={changeHandler}/>
            <SelectComponent
              name='role'
              addedClass='row'
              size={6}
              selectData={selectData}
              selecetedValue={role}
              onChangeEvent={changeHandler}/>
          </Row>
          <Row>
            <Input
              s={12}
              name='email'
              label='Email'
              validate={true}
              defaultValue={email}
              onChange={changeHandler} />
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
            className='btn custom-create-btn right'>Update</button>
        </form>
      </div>
    );
  } else {
    return <div>Loading...</div>
  }

};

export default EditUserForm;
