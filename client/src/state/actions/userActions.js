import axios from 'axios';
import { USER } from './types';
import setAuthToken from '../../utils/setAuthToken';

export const getUser = () => async (dispatch) => {
  dispatch({ type: USER.GET_ONE_RESET });
  dispatch({ type: USER.GET_ONE_LOADING });

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  axios
    .get('/api/user')
    .then((res) => {
      dispatch({ type: USER.GET_ONE_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: USER.GET_ONE_FAIL,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const getUsers = (page, limit) => async (dispatch) => {
  dispatch({ type: USER.GET_ALL_RESET });
  dispatch({ type: USER.GET_ALL_LOADING });

  axios
    .get(`/api/user/all?page=${page}&limit=${limit}`)
    .then((res) => {
      dispatch({ type: USER.GET_ALL_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: USER.GET_ALL_FAIL,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const registerUser = (payload) => async (dispatch) => {
  dispatch({ type: USER.REGISTER_RESET });
  dispatch({ type: USER.REGISTER_LOADING });

  axios
    .post('/api/user', JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      dispatch({ type: USER.REGISTER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: USER.REGISTER_FAIL,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const resetRegisterUserState = () => (dispatch) => {
  dispatch({ type: USER.REGISTER_RESET });
};

export const resetGetUserState = () => (dispatch) => {
  dispatch({ type: USER.GET_ONE_RESET });
};

export const resetGetUsersState = () => (dispatch) => {
  dispatch({ type: USER.GET_ALL_RESET });
};
