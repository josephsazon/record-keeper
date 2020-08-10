import { TRANSACTION } from '../actions/types';

const initialState = {
  addTransactionSuccess: false,
  error: null,
  hasNextPage: false,
  limit: null,
  loading: false,
  page: null,
  success: false,
  transactions: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        addTransactionSuccess: true,
      };
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
    default:
      return state;
  }
};
