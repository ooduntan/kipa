import {combineReducers} from 'redux';
import users from './userReducer';
import docStates from './documentReducer';
import roleState from './roleReducer';

const rootReducer = combineReducers({
  roleState,
  docStates,
  users
});

export default rootReducer;
