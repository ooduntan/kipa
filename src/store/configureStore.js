import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/';
import reactImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore (intialState) {
  return createStore(
    rootReducer,
    intialState,
    applyMiddleware(reactImmutableStateInvariant())
  );
};
