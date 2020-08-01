import { ACCOUNT, SET_LOADING } from './types';

export const getAccounts = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch('/accounts');
    const data = await res.json();

    dispatch({ type: ACCOUNT.GET_ALL, payload: data });
  } catch (err) {
    dispatch({
      type: 'ERROR',
      payload: err.response.statusText,
    });
  }
};

const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
