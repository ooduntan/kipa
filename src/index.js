import "babel-polyfill";
import React from "react";
import {browserHistory, Router} from "react-router";
import {render} from "react-dom";
import {Provider} from "react-redux";
import routes from "./routes/index";
import {getRoles} from "./actions/roleActions";
import configureStore from "./store/configureStore";
import "./style/main.css";

const app = document.getElementById('app');
const store = configureStore();

store.dispatch(getRoles());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  app
);
