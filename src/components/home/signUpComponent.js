// (function() {
// 	'use strict';

	import React from 'react';
	import SignUpForm from './SignUpForm';

	class SignUpComponent extends React.Component {
		render() {
			return(
				<div>
					<div className='signup-wrapper'>
						<div>Sign up for free</div>
						<div className='small-signup-text'>Create a free Doccip account</div>
					</div>
					<div className="row">
						<SignUpForm/>
					</div>
				</div>
			);
		}
	}

	export default SignUpComponent;

	// }());
