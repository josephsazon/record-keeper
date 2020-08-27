import axios from 'axios';

import { TRANSACTION } from './types';

export const addTransaction = (payload) => async (dispatch) => {
  dispatch({ type: TRANSACTION.SUBMIT_LOADING });
  dispatch({ type: TRANSACTION.SUBMIT_RESET });

  axios
    .post('/api/transaction', JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      dispatch({
        type: TRANSACTION.SUBMIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: TRANSACTION.SUBMIT_FAIL,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const getTransactions = (page, limit) => async (dispatch) => {
  dispatch({ type: TRANSACTION.SET_LOADING });
  dispatch({ type: TRANSACTION.RESET });

  axios
    .get(`/api/transaction?page=${page}&limit=${limit}`)
    .then((res) => {
      dispatch({
        type: TRANSACTION.GET_ALL,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: TRANSACTION.ERROR,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const resetSubmitTransactionState = () => (dispatch) => {
  dispatch({ type: TRANSACTION.SUBMIT_RESET });
};
