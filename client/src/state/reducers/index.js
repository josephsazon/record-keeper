import { combineReducers } from 'redux';

import accountReducer from './accountReducer';
import authReducer from './authReducer';
import productReducer from './productReducer';
import transactionReducer from './transactionReducer';
import transactionTypeReducer from './transactionTypeReducer';
import userReducer from './userReducer';

import { AUTH } from '../actions/types';

const appReducer = combineReducers({
  account: accountReducer,
  auth: authReducer,
  product: productReducer,
  transaction: transactionReducer,
  transactionType: transactionTypeReducer,
  user: userReducer,
});

export default (state, action) => {
  if (action.type === AUTH.LOGOUT) {
    localStorage.removeItem('token');
    localStorage.removeItem('accountToken');

    state = {
      auth: {
        isAuthenticated: false,
      },
    };
  }

  return appReducer(state, action);
};
