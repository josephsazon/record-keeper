import axios from 'axios';

import { TRANSACTION } from './types';

export const getTransactions = () => async (dispatch) => {
  dispatch({ type: TRANSACTION.SET_LOADING });

  axios
    .get('/api/transaction/5f28274568879d399c29bd90')
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
