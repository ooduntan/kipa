import React, {PropTypes} from 'react';
import {Button, Input, Card, Row, Col, Dropdown, NavItem} from 'react-materialize';

class InputComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      inputClassName: '',
      errorMessage: ''
    };
  }

  componentWillReceiveProps(porp) {
    if (porp.inputError) {
      this.setState({
        inputClassName: 'input-error',
        errorMessage: this.props.errorMessage
      });
    } else {
      this.setState({inputClassName: '', errorMessage: ''});
    }
  }

  render() {
    const labelClass = this.props.value ? 'active' : '';

    return (
      <div className={`input-field col ${this.props.newClass}`}>
        <input
          id={this.props.id}
          type={this.props.type}
          ref={this.props.name}
          name={this.props.name}
          value={this.props.value}
          onKeyUp={this.props.validateFunction}
          className={`validate ${this.state.inputClassName}`}
          onChange={this.props.onChangeEvent}
          required/>
        <label
          className={labelClass}
          htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <span className='error-span'>{this.state.errorMessage}</span>
      </div>
    );
  }
}

InputComponent.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChangeEvent: PropTypes.func.isRequired,
  newClass: PropTypes.string,
  errorMessage: PropTypes.string,
  validateFunction: PropTypes.func,
  inputError: PropTypes.bool
}

const ButtonComponent = ({name, text, action, newClass}) => {
  return (
    <button
      className={`btn waves-effect waves-light ${newClass}`}
      type='submit' onClick={action}
      name={name}>
      {text}
    </button>
  );
}

ButtonComponent.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.func,
  newClass: PropTypes.string
}

const DropDown = () => {
  return(
    <Dropdown trigger={
        <Button>FILTER</Button>
      }>
      <NavItem>Date</NavItem>
      <NavItem>Access</NavItem>
      <NavItem divider />
      <NavItem>three</NavItem>
    </Dropdown>
  );
}

const File = ({name, changeHandler}) => {
  return (
    <div className='file-field input-field'>
      <div className='btn custom-create-btn'>
        <span>File</span>
        <input
          onChange={changeHandler}
          name={name}
          type='file'/>
      </div>
      <div className='file-path-wrapper'>
        <input
          className='file-path validate'
          type='text'
          placeholder='Upload the document cover'/>
      </div>
    </div>
  );
}

const TextArea = ({name, value, labelClass, onChangeEvent}) => {
  return (
    <div className='input-field col s12'>
      <textarea
        id='textarea1'
        name={name}
        className='materialize-textarea'
        value={value}
        onChange={onChangeEvent}>{value}</textarea>
      <label
        className={labelClass}
        htmlForl='textarea1'>Document Content</label>
    </div>
  );
}

const CheckBox = ({data, name, extraClass, checkedData, onClickEvent}) => {
  return(
    <div className='custom-checkox'>
      <div className='grey-text'>Privilege</div>
      {data.map((item) => {
        let checked;

        if (checkedData) {
          let roleId = item._id.toString();
          checked = checkedData.indexOf(roleId) >= 0 ? 'checked' : false;
        } else {
          checked = false;
        }

        return(
          <p key={item._id}>
            <input
              defaultChecked={checked}
              name={name}
              onClick={onClickEvent}
              value={item._id}
              type='checkbox'
              id={`${name}${item._id}`} />
            <label htmlFor={`${name}${item._id}`}>{item.role}</label>
          </p>
        );
      })}
    </div>
  );
}

const SelectComponent = ({selectData, size, addedClass, selecetedValue, onChangeEvent, name}) => {
  return(
    <Row className={addedClass}>
      <Input
        name={name}
        onChange={onChangeEvent}
        s={size}
        type='select'
        label='Roles'>
        <option disabled>Choose your role</option>
        {
          selectData.map((item) => {
          let select = selecetedValue === item._id ? 'selected' :false;

          return(
            <option
              selected={select}
              key={item._id}
              value={item.role}>
              {item.role}
            </option>
          );
        })}
      </Input>
    </Row>
  );

}

export {
  InputComponent,
  ButtonComponent,
  SelectComponent,
  File,
  TextArea,
  CheckBox
};
