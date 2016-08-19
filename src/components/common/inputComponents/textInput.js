import React, {PropTypes, Component} from 'react';

class InputComponent extends Component {
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
  value: PropTypes.string,
  inputError: PropTypes.bool
};

export default InputComponent;