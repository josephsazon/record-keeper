import axios from 'axios';
import { PRODUCT } from './types';

export const clearCurrentProduct = () => (dispatch) => {
  dispatch({ type: PRODUCT.CURRENT_CLEAR });
};

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

export const setCurrentProduct = (product) => (dispatch) => {
  dispatch({ type: PRODUCT.CURRENT_SET, payload: product });
};

export const updateProduct = (product) => async (dispatch) => {
  dispatch({ type: PRODUCT.SET_LOADING });

  return axios
    .put(`/api/products/${product._id}`, JSON.stringify(product), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      dispatch({
        type: PRODUCT.UPDATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PRODUCT.UPDATE_FAIL,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const updateProductReset = () => (dispatch) => {
  dispatch({ type: PRODUCT.UPDATE_RESET });
};
