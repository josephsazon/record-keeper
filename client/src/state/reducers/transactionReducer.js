import { TRANSACTION } from '../actions/types';

const initialState = {
  error: null,
  loading: false,
  success: false,
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
        loading: false,
        success: true,
        transactions: action.payload,
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
