import React from 'react';
import TinyMCE from 'react-tinymce';
import Preloader from '../common/preloader';
import {
  Button,
  Input,
  Card,
  Row,
  Col,
  Dropdown,
  NavItem
} from 'react-materialize';
import {
  InputComponent,
  ButtonComponent,
  SelectComponent,
  CheckBox,
  File
} from '../common/input';

const EditDocumentForm = ({
  preloader,
  submitAction,
  changeHandler,
  docRoles,
  formDefaultData,
  displayFeedBack,
  feedBack,
  feedBackColor,
  formStatus,
  checkboxHandler,
  tinymceEvent
}) => {
  const {title, content, access} = formDefaultData;
  if (title.length) {
    return(
      <div className='edit-doc-form'>
        <form onSubmit={submitAction}>
          <Row>
            <Input
              s={6}
              name='title'
              label='Title'
              validate
              defaultValue={title}
              onChange={changeHandler}/>
            <CheckBox
              data={docRoles}
              checkedData={access}
              name='access'
              extraClass='edit-docs-checkbox'
              onClickEvent={checkboxHandler}/>
          </Row>
          <Row className='left-padding'>
            <TinyMCE
              content={content}
               config={{
                 height : '280',
                 forced_root_block: false,
                 plugins: 'link image code',
                 toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
               }}
               onChange={tinymceEvent}
             />
          </Row>
          <span
            className='edit-user-error'></span>
          <Preloader
            showLoader={preloader}
            size='small'
            position='left'/>
          <button
            className='btn custom-update-btn right'>Update</button>
      </form>
    </div>
    );
  } else {
    return (<div></div>)
  }
};

export default EditDocumentForm;
