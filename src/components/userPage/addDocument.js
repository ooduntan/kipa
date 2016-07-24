import React, {PropTypes} from 'react';
import Preloader from '../common/preloader';
import {
  InputComponent,
  ButtonComponent,
  SelectComponent,
  TextArea,
  CheckBox,
  File
} from '../common/input';

const NewDocumentForm = ({
  changeHandler,
  CheckboxHandler,
  submitAction,
  showLoader,
  docRoles
}) => {
  return(
    <form onSubmit={submitAction}>
      <div id='modal1' className='modal modal-fixed-footer'>
        <div className='modal-content'>
          <h4>Create new document</h4>
          <div className='row'>
            <File
              onChangeEvent={changeHandler}
              name='documentCover'/>
          </div>
          <div className='row'>
            <InputComponent
              name='title'
              type='text'
              id='title'
              label='Title'
              newClass='s6'
              onChangeEvent={changeHandler}/>
            <CheckBox
              data={docRoles}
              name='role'
              onClickEvent={CheckboxHandler}/>
          </div>
          <div className='row'>
            <TextArea
              name='content'
              onChangeEvent={changeHandler}/>
          </div>
        </div>
        <div className='modal-footer'>
          <Preloader
            size='small'
            position='left'
            showLoader={showLoader}
            />
          <button
            className='btn custom-create-btn'>CREATE</button>
        </div>
      </div>
    </form>
  );

};

NewDocumentForm.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  docRoles: PropTypes.array.isRequired
}

export default NewDocumentForm;
