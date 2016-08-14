import React, {PropTypes, Component} from "react";
import SignInForm from "./signInForm";

export class SignInComponent extends Component {
  constructor() {
    super();
    this.state = {
      displayForm: 'block',
      displayLoader: 'show-element',
      loginData: {}
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.signIn = this.signIn.bind(this);
    this.toggleSignIn = this.toggleSignIn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stateProp.userState.shouldRedirect) {
      this.context.router.push('/owned-docs');
    }
  }

  onChangeHandler(event) {
    this.state.loginData[event.target.name] = event.target.value;
    this.setState({loginData: this.state.loginData});
  }

  signIn(event) {
    event.preventDefault();
    this.props.userActions.loginUser(this.state.loginData);
  }

  toggleSignIn(event) {
    event.preventDefault();
    this.props.toggleSignUp(this.refs.signInContainer);
  }

  render() {
    const {displayLoader, error} = this.props.stateProp.userState;

    return (
      <div ref='signInContainer'
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
          errorMessage={error}
          signInAction={this.signIn}
          showLoader={displayLoader}/>
        <a className='custom-link'
           onClick={this.toggleSignIn}>
          New user? Sign up
        </a>
      </div>
    );
  }
}

SignInComponent.propTypes = {
  toggleSignUp: PropTypes.func.isRequired,
  userActions: PropTypes.object.isRequired,
  stateProp: PropTypes.object
};

SignInComponent.contextTypes = {
  router: PropTypes.object
};

export default SignInComponent;
