import { AUTH } from './types';
import axios from 'axios';

// utils
import setAuthToken from '../../utils/setAuthToken';

export const changePassword = (payload) => async (dispatch) => {
  dispatch({ type: AUTH.SUBMIT_RESET });
  dispatch({ type: AUTH.SUBMIT_LOADING });

  axios
    .put('/api/auth/password', JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      dispatch({ type: AUTH.SUBMIT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: AUTH.SUBMIT_FAIL,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const login = (formData) => async (dispatch) => {
  dispatch({ type: AUTH.SET_LOADING });

  axios
    .post('/api/auth', JSON.stringify(formData), {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      dispatch({ type: AUTH.LOGIN_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      const { response } = err;

      dispatch({
        type: AUTH.LOGIN_FAIL,
        payload: response.data.msg || response.statusText,
      });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: AUTH.LOGOUT });
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  axios
    .get('/api/user')
    .then((res) => {
      dispatch({ type: AUTH.LOAD_USER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      const { response } = err;

      dispatch({
        type: AUTH.LOAD_USER_FAIL,
        payload: response.data.msg || response.statusText,
      });
    });
};

export const resetSubmitAuthState = () => (dispatch) => {
  dispatch({ type: AUTH.SUBMIT_RESET });
};
