import axios from 'axios';
import { PRODUCT } from './types';

export const getProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT.CLEAR_ALL });

  axios
    .get('/api/products')
    .then((res) => {
      dispatch({ type: PRODUCT.GET_ALL, payload: res.data.docs });
    })
    .catch((err) => {
      dispatch({
        type: PRODUCT.ERROR,
        payload: err.response.data.msg || err.response.statusText,
      });
    });
};
