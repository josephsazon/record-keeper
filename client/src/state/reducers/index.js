import { combineReducers } from 'redux';

import accountReducer from './accountReducer';
import authReducer from './authReducer';
import transactionReducer from './transactionReducer';

export default combineReducers({
  account: accountReducer,
  auth: authReducer,
  transaction: transactionReducer,
});
