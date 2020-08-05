import { AUTH } from './types';
import axios from 'axios';

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
