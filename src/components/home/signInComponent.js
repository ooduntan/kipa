// (function() {
// 	'use strict';

	import React from 'react';
	import {ButtonComponent} from '../common/input';

	class SignInComponent extends React.Component {
		showSignIn(event) {
			event.preventDefault();
			alert('I am working very well');
		}

		render() {
			return(
				<div className='signup-container'>
					<span>Existing user? Sign in</span>
					<ButtonComponent
			  		text='SIGN IN'
			  		action={this.showSignIn}
			  		name='sign-in'
			  		newClass='custom-green custom-signup-btn'/>
				</div>
			);
		}
	}

export default SignInComponent;

	// }());
