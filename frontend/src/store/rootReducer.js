import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import dataReducer from './data/reducer';

export default combineReducers({
  user: userReducer,
  data: dataReducer,
});
