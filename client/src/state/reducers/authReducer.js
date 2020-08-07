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
    case AUTH.LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case AUTH.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);

      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH.LOAD_USER_FAIL:
    case AUTH.LOGIN_FAIL:
    case AUTH.LOGOUT:
      localStorage.removeItem('token');

      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        loading: false,
        token: null,
        user: null,
      };
    case AUTH.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
