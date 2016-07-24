import React, {PropTypes} from 'react';

class InputComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      inputClassName: '',
      errorMessage: ''
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event) {
    this.props.onChangeEvent(event);
    if (typeof(this.props.validateFunction) === 'function') {
      this.props.validateFunction(event);
    }
  }

  componentWillReceiveProps(porp) {
    if (porp.inputError) {
      this.setState({inputClassName: 'input-error', errorMessage: this.props.errorMessage});
    } else {
      this.setState({inputClassName: '', errorMessage: ''});
    }
  }

  render() {
    return (
      <div className={`input-field col ${this.props.newClass}`}>
        <input id={this.props.id} type={this.props.type} ref={this.props.name} name={this.props.name} className={`validate ${this.state.inputClassName}`} onChange={this.onChangeHandler} required/>
        <label htmlFor={this.props.id}>{this.props.label}</label>
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
    <button className={`btn waves-effect waves-light ${newClass}`} type='submit' onClick={action} name={name}>
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

const File = ({name, changeHandler}) => {
  return (
    <div className='file-field input-field'>
      <div className='btn'>
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

const TextArea = ({name, onChangeEvent}) => {
  return (
    <div className='input-field col s12'>
      <textarea
        id='textarea1'
        name={name}
        className='materialize-textarea'
        onChange={onChangeEvent}></textarea>
      <label htmlForl='textarea1'>Document Content</label>
    </div>
  );
}

const CheckBox = ({data, name, onClickEvent}) => {
  return(
    <div className='custom-checkox'>
      <div className='grey-text'>Privilege</div>
    {data.map((item) => {
      return(
        <p>
          <input
            name={name}
            onClick={onClickEvent}
            value={item._id}
            type='checkbox'
            id={item._id} />
          <label htmlFor={item._id}>{item.role}</label>
        </p>
      );
    })}
  </div>
  );
}

const SelectComponent = ({selectData, onChangeEvent, name}) => {
  $('select').material_select();

  return(
    <div className='input-field col s6'>
      <select
        name={name}
        onChange={onChangeEvent}>
        <option value='' disabled selected>Choose your role</option>
        {selectData.map((item) => {
          return (<option key={item._id} value={item._id}>{item.role}</option>)
        })}
      </select>
      <label>Roles</label>
    </div>
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
