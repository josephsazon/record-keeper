import axios from 'axios';

import { ACCOUNT } from './types';

export const addAccount = (payload) => async (dispatch) => {
  dispatch({ type: ACCOUNT.SUBMIT_RESET });
  dispatch({ type: ACCOUNT.SUBMIT_LOADING });

  axios
    .post('/api/accounts', JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      dispatch({ type: ACCOUNT.SUBMIT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: ACCOUNT.SUBMIT_FAIL,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const addUserToAccount = (payload) => async (dispatch) => {
  dispatch({ type: ACCOUNT.SUBMIT_RESET });
  dispatch({ type: ACCOUNT.SUBMIT_LOADING });

  axios
    .post('/api/accounts/user', JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      dispatch({ type: ACCOUNT.SUBMIT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: ACCOUNT.SUBMIT_FAIL,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const deleteAccount = () => async (dispatch) => {
  dispatch({ type: ACCOUNT.DELETE_RESET });
  dispatch({ type: ACCOUNT.DELETE_LOADING });

  axios
    .delete('/api/accounts')
    .then(() => {
      dispatch({ type: ACCOUNT.DELETE_SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: ACCOUNT.DELETE_FAIL,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const getAccount = () => async (dispatch) => {
  dispatch({ type: ACCOUNT.GET_ONE_LOADING });

  return axios
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

export const getAccounts = (page, limit) => async (dispatch) => {
  dispatch({ type: ACCOUNT.GET_ALL_RESET });
  dispatch({ type: ACCOUNT.GET_ALL_LOADING });

  axios
    .get(`/api/accounts?page=${page}&limit=${limit}`)
    .then((res) => {
      dispatch({ type: ACCOUNT.GET_ALL_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: ACCOUNT.GET_ALL_FAIL,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const removeUserFromAccount = (payload) => async (dispatch) => {
  dispatch({ type: ACCOUNT.SUBMIT_RESET });
  dispatch({ type: ACCOUNT.SUBMIT_LOADING });

  axios
    .delete('/api/accounts/user', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: payload,
    })
    .then((res) => {
      dispatch({ type: ACCOUNT.SUBMIT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: ACCOUNT.SUBMIT_FAIL,
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

export const resetDeleteAccountState = () => (dispatch) => {
  dispatch({ type: ACCOUNT.DELETE_RESET });
};

export const resetGetAccountsState = () => (dispatch) => {
  dispatch({ type: ACCOUNT.GET_ALL_RESET });
};

export const resetSubmitAccountState = () => (dispatch) => {
  dispatch({ type: ACCOUNT.SUBMIT_RESET });
};
