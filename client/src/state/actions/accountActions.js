import axios from 'axios';

import { ACCOUNT } from './types';

export const getAccount = () => async (dispatch) => {
  dispatch({ type: ACCOUNT.GET_ONE_LOADING });

  axios
    .get(`/api/accounts/one`)
    .then((res) => {
      dispatch({ type: ACCOUNT.GET, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: ACCOUNT.ERROR,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const getAccounts = () => async (dispatch) => {
  dispatch({ type: ACCOUNT.SET_LOADING });

  axios
    .get('/api/accounts')
    .then((res) => {
      dispatch({ type: ACCOUNT.GET_ALL, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: ACCOUNT.ERROR,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const requestAccountToken = (id) => async (dispatch) => {
  dispatch({ type: ACCOUNT.GET_ONE_LOADING });

  return axios
    .post('/api/accounts/token', JSON.stringify({ accountId: id }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      dispatch({ type: ACCOUNT.TOKEN_SET, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: ACCOUNT.ERROR,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const clearAccountToken = () => async (dispatch) => {
  dispatch({ type: ACCOUNT.TOKEN_CLEAR });
};
