import {combineReducers} from 'redux'
import users from './userReducer';
import docStates from './documentReducer';

const rootReducer = combineReducers({
  docStates,
  users
});

export default rootReducer;
