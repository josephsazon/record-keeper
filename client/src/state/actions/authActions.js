import { AUTH } from './types';
import axios from 'axios';

// utils
import setAuthToken from '../../utils/setAuthToken';

export const login = (formData) => async (dispatch) => {
  axios
    .post('/auth', JSON.stringify(formData), {
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
    .get('/user')
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
