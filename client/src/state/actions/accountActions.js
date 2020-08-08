import axios from 'axios';

import { ACCOUNT } from './types';

export const getAccount = (id) => async (dispatch) => {
  dispatch({ type: ACCOUNT.SET_LOADING });

  axios
    .get(`/api/accounts/${id}`)
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
