// (function () {
// 	'use strict';

	import React, { PropTypes } from 'react';

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
				this.setState({
					inputClassName: 'input-error',
					errorMessage: this.props.errorMessage
				});
  		} else {
  			this.setState({
  				inputClassName: '',
  				errorMessage: ''
  			});
  		}
		}

		render() {
			return(
				<div className={`input-field col ${this.props.newClass}`}>
	        <input
	        	id={this.props.id}
	        	type={this.props.type}
	        	ref={this.props.name}
	        	name={this.props.name}
	        	className={`validate ${this.state.inputClassName}`}
	        	onChange={this.onChangeHandler}
	        	required/>
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
			return(
				<button
				className={`btn waves-effect waves-light ${newClass}`}
				type='submit'
				onClick={action}
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

	const SelectComponent = (roles) => {

		return (
			<div class='input-field col s6'>
				<select>
					<option value='' disabled selected>Choose your role</option>
					{roles.map((role) => {
						<option value={role.role}>{role.role}</option>
					})}
				</select>
			 <label>Role</label>
			</div>
		);
	}

	export { InputComponent, ButtonComponent };

// }());
