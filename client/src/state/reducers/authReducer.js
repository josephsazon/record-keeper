import { AUTH } from '../actions/types';

const initialState = {
  error: null,
  isAuthenticated: false,
  loading: false,
  token: localStorage.getItem('token'),
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);

      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH.LOGIN_FAIL:
      localStorage.removeItem('token');

      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};
