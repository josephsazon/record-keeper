import { PRODUCT } from '../actions/types';

const initialState = {
  error: null,
  getProductsLoading: false,
  getProductsSuccess: false,
  products: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT.CLEAR_ALL:
    case PRODUCT.ERROR:
      return {
        ...state,
        error: action.payload,
        getProductsLoading: false,
        getProductsSuccess: false,
        products: [],
      };
    case PRODUCT.GET_ALL:
      return {
        ...state,
        getProductsLoading: false,
        getProductsSuccess: true,
        products: action.payload,
      };

    default:
      return state;
  }
};
