import { TRANSACTION } from '../actions/types';

const initialState = {
  error: null,
  hasNextPage: false,
  limit: null,
  loading: false,
  page: null,
  success: false,
  submitTransactionLoading: false,
  submitTransactionSuccess: false,
  submitTransactionTriggered: false,
  transactions: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION.ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    case TRANSACTION.GET_ALL:
      return {
        ...state,
        hasNextPage: action.payload.hasNextPage,
        limit: action.payload.limit,
        loading: false,
        page: action.payload.page,
        success: true,
        transactions: action.payload.docs,
      };
    case TRANSACTION.RESET:
      return {
        ...state,
        addTransactionSuccess: false,
        transactions: null,
      };
    case TRANSACTION.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TRANSACTION.SUBMIT_FAIL:
      return {
        ...state,
        submitTransactionLoading: false,
        submitTransactionSuccess: false,
        submitTransactionTriggered: true,
      };
    case TRANSACTION.SUBMIT_LOADING:
      return {
        ...state,
        submitTransactionLoading: true,
      };
    case TRANSACTION.SUBMIT_RESET:
      return {
        ...state,
        submitTransactionSuccess: false,
        submitTransactionTriggered: false,
      };
    case TRANSACTION.SUBMIT_SUCCESS:
      return {
        ...state,
        submitTransactionLoading: false,
        submitTransactionSuccess: true,
        submitTransactionTriggered: true,
      };
    default:
      return state;
  }
};
