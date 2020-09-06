import { AUTH } from '../actions/types';

const initialState = {
  error: null,
  isAuthenticated: false,
  loginLoading: false,
  loginSuccess: false,
  loginTriggered: false,
  submitAuthLoading: false,
  submitAuthSuccess: false,
  submitAuthTriggered: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH.LOGIN_FAIL:
      localStorage.removeItem('token');

      return {
        ...state,
        error: action.payload,
        loginLoading: false,
        loginSuccess: false,
        loginTriggered: true,
      };
    case AUTH.LOGIN_LOADING:
      return {
        ...state,
        loginLoading: true,
      };
    case AUTH.LOGIN_RESET:
      return {
        ...state,
        error: null,
        loginLoading: false,
        loginSuccess: false,
        loginTriggered: false,
      };
    case AUTH.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);

      return {
        ...state,
        isAuthenticated: true,
        loginLoading: false,
        loginSuccess: true,
        loginTriggered: true,
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
