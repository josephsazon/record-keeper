import axios from 'axios';
import { PRODUCT } from './types';

export const clearProducts = () => (dispatch) => {
  dispatch({ type: PRODUCT.CLEAR_ALL });
};

export const getProducts = (page, limit) => async (dispatch) => {
  dispatch({ type: PRODUCT.SET_LOADING });

  axios
    .get(`/api/products?page=${page}&limit=${limit}`)
    .then((res) => {
      dispatch({ type: PRODUCT.GET_ALL, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: PRODUCT.ERROR,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};
