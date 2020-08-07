import { ACCOUNT } from '../actions/types';

const initialState = {
  accounts: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
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
