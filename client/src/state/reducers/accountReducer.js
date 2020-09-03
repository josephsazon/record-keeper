import setAccountToken from '../../utils/setAccountToken';
import { ACCOUNT } from '../actions/types';

const initialState = {
  accounts: null,
  accountToken: null,
  deleteAccountLoading: false,
  deleteAccountSuccess: false,
  deleteAccountTriggered: false,
  error: null,
  getAccountLoading: false,
  getAccountsLoading: false,
  getAccountsSuccess: false,
  getAccountsTriggered: false,
  isAccountAuthenticated: false,
  hasNextPage: false,
  limit: null,
  loading: false,
  page: null,
  submitAccountLoading: false,
  submitAccountSuccess: false,
  submitAccountTriggered: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT.DELETE_FAIL:
      return {
        ...state,
        deleteAccountLoading: false,
        deleteAccountSuccess: false,
        deleteAccountTriggered: false,
        error: action.payload,
      };
    case ACCOUNT.DELETE_LOADING:
      return {
        ...state,
        deleteAccountLoading: true,
      };
    case ACCOUNT.DELETE_RESET:
      return {
        ...state,
        deleteAccountLoading: false,
        deleteAccountSuccess: false,
        deleteAccountTriggered: false,
        error: null,
      };
    case ACCOUNT.DELETE_SUCCESS:
      return {
        ...state,
        deleteAccountLoading: false,
        deleteAccountSuccess: true,
        deleteAccountTriggered: true,
      };
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
    case ACCOUNT.GET_ALL_FAIL:
      return {
        ...state,
        error: action.payload,
        getAccountsLoading: false,
        getAccountsSuccess: false,
        getAccountsTriggered: true,
      };
    case ACCOUNT.GET_ALL_LOADING:
      return {
        ...state,
        getAccountsLoading: true,
      };
    case ACCOUNT.GET_ALL_RESET:
      return {
        ...state,
        accounts: null,
        error: null,
        getAccountsLoading: false,
        getAccountsSuccess: false,
        getAccountsTriggered: false,
      };
    case ACCOUNT.GET_ALL_SUCCESS:
      return {
        ...state,
        accounts: action.payload.docs,
        getAccountsLoading: false,
        getAccountsSuccess: true,
        getAccountsTriggered: true,
        hasNextPage: action.payload.hasNextPage,
        limit: action.payload.limit,
        page: action.payload.page,
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
