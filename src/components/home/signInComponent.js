import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import SignInForm from './signInForm';
import {bindActionCreators} from 'redux';
import {ButtonComponent} from '../common/input';
import {loginUser} from '../../actions/userAction';

class SignInComponent extends Component {
	constructor() {
		super();
		this.state = {
			displayForm: 'block',
			displayLoader: 'show-element',
			loginData: {}
		};

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.showSignIn = this.showSignIn.bind(this);
		this.signIn = this.signIn.bind(this);
	}

  showSignIn(event) {
    event.preventDefault();
    alert('I am working very well');
  }

	onChangeHandler(event) {
		this.state.loginData[event.target.name] = event.target.value;
		this.setState({loginData: this.state.loginData});
	}

	signIn(event) {
		event.preventDefault();
		this.props.loginAction(this.state.loginData);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user.shouldRedirect) {
			this.context.router.push('/dashboard');
		}
	}

  render() {
    return (
      <div
				style={{display: this.state.displayForm}}
				className='signup-container'>
				<div className='signup-wrapper'>
          <div>Sign in</div>
          <div className='small-signup-text'>
            Sign in to create, share and manage documents.
          </div>
        </div>
				<SignInForm
					changeHandler={this.onChangeHandler}
					errorMessage={this.props.user.error}
					signInAction={this.signIn}
					showLoader={this.props.user.displayLoader}/>
					<a className='custom-link'
						onClick={this.showSignIn}>
						New user? Sign up
					</a>
      </div>
    );
  }
}

SignInComponent.contextTypes = {
	router: PropTypes.object
}

function mapDispatchToProps(dispatch) {
  return {
    loginAction: bindActionCreators(loginUser, dispatch)
  }
}

function mapStateToProps(state, ownProps) {
  return {user: state.users}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);
