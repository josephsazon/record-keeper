import setAccountToken from '../../utils/setAccountToken';
import { ACCOUNT } from '../actions/types';

const initialState = {
  accounts: null,
  accountToken: null,
  error: null,
  getAccountLoading: false,
  isAccountAuthenticated: false,
  loading: false,
  submitAccountLoading: false,
  submitAccountSuccess: false,
  submitAccountTriggered: false,
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
    case ACCOUNT.SUBMIT_FAIL:
      return {
        ...state,
        error: action.payload,
        submitAccountLoading: false,
        submitAccountSuccess: false,
        submitAccountTriggered: true,
      };
    case ACCOUNT.SUBMIT_LOADING:
      return {
        ...state,
        submitAccountLoading: true,
      };
    case ACCOUNT.SUBMIT_RESET:
      return {
        ...state,
        error: null,
        submitAccountLoading: false,
        submitAccountSuccess: false,
        submitAccountTriggered: false,
      };
    case ACCOUNT.SUBMIT_SUCCESS:
      return {
        ...state,
        submitAccountLoading: false,
        submitAccountSuccess: true,
        submitAccountTriggered: true,
      };
    case ACCOUNT.TOKEN_CLEAR:
      localStorage.removeItem('accountToken');

      return {
        ...state,
        account: {},
        accountToken: null,
        isAccountAuthenticated: false,
      };
    case ACCOUNT.TOKEN_SET:
      localStorage.setItem('accountToken', action.payload.accountToken);
      setAccountToken(localStorage.accountToken);

      return {
        ...state,
        accountToken: action.payload.accountToken,
        isAccountAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
};
