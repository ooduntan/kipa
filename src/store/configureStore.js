import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/';
import thunk from 'redux-thunk';

export default function configureStore (intialState) {
  return createStore(
    rootReducer,
    intialState,
    applyMiddleware(thunk)
  );
}
