import { TRANSACTION } from './types';

export const getTransactions = () => async (dispatch) => {
  try {
    const res = await fetch('/transactions?_sort=id&_order=desc');
    const data = await res.json();

    dispatch({
      type: TRANSACTION.GET_ALL,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION.ERROR,
      payload: err.response.statusText,
    });
  }
};
