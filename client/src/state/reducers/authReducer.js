import { AUTH } from '../actions/types';

const initialState = {
  error: null,
  isAuthenticated: false,
  loading: false,
  submitAuthLoading: false,
  submitAuthSuccess: false,
  submitAuthTriggered: false,
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
    case AUTH.SUBMIT_FAIL:
      return {
        ...state,
        error: action.payload,
        submitAuthLoading: false,
        submitAuthSuccess: false,
        submitAuthTriggered: true,
      };
    case AUTH.SUBMIT_LOADING:
      return {
        ...state,
        submitAuthLoading: true,
      };
    case AUTH.SUBMIT_RESET:
      return {
        ...state,
        error: null,
        submitAuthLoading: false,
        submitAuthSuccess: false,
        submitAuthTriggered: false,
      };
    case AUTH.SUBMIT_SUCCESS:
      return {
        ...state,
        submitAuthLoading: false,
        submitAuthSuccess: true,
        submitAuthTriggered: true,
      };
    default:
      return state;
  }
};
