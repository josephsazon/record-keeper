import setAccountToken from '../../utils/setAccountToken';
import axios from 'axios';
import { ACCOUNT } from '../actions/types';

const initialState = {
  accounts: null,
  accountToken: null,
  error: null,
  getAccountLoading: false,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT.ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };
    }
    case ACCOUNT.GET:
      return {
        ...state,
        account: action.payload,
        getAccountLoading: false,
        loading: false,
        success: true,
      };
    case ACCOUNT.GET_ONE_LOADING:
      return {
        ...state,
        getAccountLoading: true,
      };
    case ACCOUNT.GET_ALL:
      return {
        ...state,
        accounts: action.payload,
        loading: false,
      };
    case ACCOUNT.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACCOUNT.TOKEN_CLEAR:
      localStorage.removeItem('accountToken');

      return {
        ...state,
        account: {},
        accountToken: null,
      };
    case ACCOUNT.TOKEN_SET:
      localStorage.setItem('accountToken', action.payload.accountToken);
      setAccountToken(localStorage.accountToken);

      return {
        ...state,
        accountToken: action.payload.accountToken,
        loading: false,
      };
    default:
      return state;
  }
};
