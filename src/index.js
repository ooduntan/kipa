import 'babel-polyfill';
const app = document.getElementById('app');
import React from 'react';
import { browserHistory, Router } from 'react-router';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import routes from './routes/index';
import configureStore from './store/configureStore';
import './style/main.css';

const store = configureStore();

render(<Provider store={store}>
  <Router history={browserHistory} routes={routes}/>
</Provider>, app);
