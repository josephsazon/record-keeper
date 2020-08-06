import axios from 'axios';

import { ACCOUNT, SET_LOADING } from './types';

export const getAccounts = () => async (dispatch) => {
  setLoading();

  axios
    .get('/api/accounts')
    .then((res) => {
      dispatch({ type: ACCOUNT.GET_ALL, payload: res.data });
    })
    .catch((err) => {
      const { response } = err;

      dispatch({
        type: 'ERROR',
        payload: response.data.msg || response.statusText,
      });
    });
};

const setLoading = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};
