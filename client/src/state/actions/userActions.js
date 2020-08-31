import axios from 'axios';
import { USER } from './types';

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

export const resetGetUsersState = () => (dispatch) => {
  dispatch({ type: USER.GET_ALL_RESET });
};
