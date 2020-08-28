import axios from 'axios';
import { PRODUCT } from './types';

export const addProduct = (product) => async (dispatch) => {
  dispatch({ type: PRODUCT.SUBMIT_LOADING });
  dispatch({ type: PRODUCT.SUBMIT_RESET });

  axios
    .post('/api/products', JSON.stringify(product), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      dispatch({ type: PRODUCT.SUBMIT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: PRODUCT.SUBMIT_FAIL,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT.SUBMIT_LOADING });
  dispatch({ type: PRODUCT.SUBMIT_RESET });

  axios
    .delete(`/api/products/${id}`)
    .then((res) => {
      dispatch({ type: PRODUCT.SUBMIT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: PRODUCT.SUBMIT_FAIL,
        payload: err.response.data.msg || err.respose.statusText,
      });
    });
};

export const getProducts = (page, limit) => async (dispatch) => {
  dispatch({ type: PRODUCT.GET_ALL_RESET });
  dispatch({ type: PRODUCT.GET_ALL_LOADING });

  axios
    .get(`/api/products?page=${page}&limit=${limit}`)
    .then((res) => {
      dispatch({ type: PRODUCT.GET_ALL_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: PRODUCT.GET_ALL_FAIL,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const updateProduct = (product) => async (dispatch) => {
  dispatch({ type: PRODUCT.SUBMIT_LOADING });
  dispatch({ type: PRODUCT.SUBMIT_RESET });

  return axios
    .put(`/api/products/${product._id}`, JSON.stringify(product), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      dispatch({
        type: PRODUCT.SUBMIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PRODUCT.SUBMIT_FAIL,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};

export const clearCurrentProduct = () => (dispatch) => {
  dispatch({ type: PRODUCT.CURRENT_CLEAR });
};

export const resetGetProducts = () => (dispatch) => {
  dispatch({ type: PRODUCT.GET_ALL_RESET });
};

export const resetSubmitProduct = () => (dispatch) => {
  dispatch({ type: PRODUCT.SUBMIT_RESET });
};

export const setCurrentProduct = (product) => (dispatch) => {
  dispatch({ type: PRODUCT.CURRENT_SET, payload: product });
};
