import { combineReducers } from 'redux';

import accountReducer from './accountReducer';
import authReducer from './authReducer';
import productReducer from './productReducer';
import transactionReducer from './transactionReducer';
import transactionTypeReducer from './transactionTypeReducer';
import userReducer from './userReducer';

export default combineReducers({
  account: accountReducer,
  auth: authReducer,
  product: productReducer,
  transaction: transactionReducer,
  transactionType: transactionTypeReducer,
  user: userReducer,
});
