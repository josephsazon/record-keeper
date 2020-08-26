import { TRANSACTION_TYPE } from '../actions/types';

const initialState = {
  current: null,
  submitTransactionTypeLoading: false,
  submitTransactionTypeSuccess: false,
  submitTransactionTypeTriggered: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION_TYPE.CURRENT_CLEAR:
      return {
        ...state,
        current: null,
      };
    case TRANSACTION_TYPE.CURRENT_SET:
      return {
        ...state,
        current: action.payload,
      };
    case TRANSACTION_TYPE.SUBMIT_FAIL:
      return {
        ...state,
        submitTransactionTypeLoading: false,
        submitTransactionTypeSuccess: false,
        submitTransactionTypeTriggered: true,
      };
    case TRANSACTION_TYPE.SUBMIT_LOADING:
      return {
        ...state,
        submitTransactionTypeLoading: true,
      };
    case TRANSACTION_TYPE.SUBMIT_RESET:
      return {
        ...state,
        submitTransactionTypeSuccess: false,
        submitTransactionTypeTriggered: false,
      };
    case TRANSACTION_TYPE.SUBMIT_SUCCESS:
      return {
        ...state,
        submitTransactionTypeLoading: false,
        submitTransactionTypeSuccess: true,
        submitTransactionTypeTriggered: true,
      };
    default:
      return state;
  }
};
