import axios from 'axios';

import { ACCOUNT } from './types';

export const getAccounts = () => async (dispatch) => {
  dispatch({ type: ACCOUNT.SET_LOADING });

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
