//(function(){
	// 'use strict';

	import React from 'react';
	import { Route, IndexRoute } from 'react-router';
	import Home from '../components/main';
	import HomePage from '../components/home/homePage';
	import AboutPage from '../components/aboutPage/aboutPage';
	import Description from '../components/appDescriptionPage/descriptionPage';
	import Dashboard from '../components/userPage/dashboard';
	import NotFoundPage from '../components/NotFoundPage';

	export default (
			<Route path='/' component={Home}>
				<IndexRoute component={HomePage}/>
				<Route path='about' component={AboutPage}/>
				<Route path='the-app' component={Description}/>
				<Route path='/dashboard' component={Dashboard}/>
				<Route path='*' component={NotFoundPage}/>
			</Route>
		)

//}());
