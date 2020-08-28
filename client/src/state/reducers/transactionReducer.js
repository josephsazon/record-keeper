import { TRANSACTION } from '../actions/types';

const initialState = {
  error: null,
  getTransactionsLoading: false,
  getTransactionsSuccess: false,
  getTransactionsTriggered: false,
  hasNextPage: false,
  limit: null,
  page: null,
  submitTransactionLoading: false,
  submitTransactionSuccess: false,
  submitTransactionTriggered: false,
  transactions: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION.GET_ALL_FAIL:
      return {
        ...state,
        error: action.payload,
        getTransactionsLoading: false,
        getTransactionsSuccess: false,
        getTransactionsTriggered: true,
        transactions: null,
      };
    case TRANSACTION.GET_ALL_LOADING:
      return {
        ...state,
        getTransactionsLoading: true,
      };
    case TRANSACTION.GET_ALL_RESET:
      return {
        ...state,
        error: null,
        getTransactionsLoading: false,
        getTransactionsSuccess: false,
        getTransactionsTriggered: false,
        transactions: null,
      };
    case TRANSACTION.GET_ALL_SUCCESS:
      return {
        ...state,
        getTransactionsLoading: false,
        getTransactionsSuccess: true,
        getTransactionsTriggered: true,
        hasNextPage: action.payload.hasNextPage,
        limit: action.payload.limit,
        page: action.payload.page,
        transactions: action.payload.docs,
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
        submitTransactionLoading: false,
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
