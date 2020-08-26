import { TRANSACTION_TYPE } from './types';
import axios from 'axios';

export const addTransactionType = (transactionType) => async (dispatch) => {
  dispatch({ type: TRANSACTION_TYPE.SUBMIT_LOADING });
  dispatch({ type: TRANSACTION_TYPE.SUBMIT_RESET });

  axios
    .post('/api/account/transaction-type', JSON.stringify(transactionType), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      dispatch({ type: TRANSACTION_TYPE.SUBMIT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: TRANSACTION_TYPE.SUBMIT_FAIL,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const updateTransactionType = (transactionType) => async (dispatch) => {
  dispatch({ type: TRANSACTION_TYPE.SUBMIT_LOADING });
  dispatch({ type: TRANSACTION_TYPE.SUBMIT_RESET });

  axios
    .put(
      `/api/account/transaction-type/${transactionType._id}`,
      JSON.stringify(transactionType),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      dispatch({ type: TRANSACTION_TYPE.SUBMIT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: TRANSACTION_TYPE.SUBMIT_FAIL,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const clearCurrentTransactionType = () => (dispatch) => {
  dispatch({ type: TRANSACTION_TYPE.CURRENT_CLEAR });
};

export const resetSubmitTransactionType = () => (dispatch) => {
  dispatch({ type: TRANSACTION_TYPE.SUBMIT_RESET });
};

export const setCurrentTransactionType = (transactionType) => (dispatch) => {
  dispatch({ type: TRANSACTION_TYPE.CURRENT_SET, payload: transactionType });
};
