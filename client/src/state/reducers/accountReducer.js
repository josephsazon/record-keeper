import { ACCOUNT } from '../actions/types';

const initialState = {
  accounts: null,
  error: null,
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
        loading: false,
        success: true,
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
    default:
      return state;
  }
};
