import { combineReducers } from 'redux';

import accountReducer from './accountReducer';
import authReducer from './authReducer';
import productReducer from './productReducer';
import transactionReducer from './transactionReducer';

export default combineReducers({
  account: accountReducer,
  auth: authReducer,
  product: productReducer,
  transaction: transactionReducer,
});
