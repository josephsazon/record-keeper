import { PRODUCT } from '../actions/types';

const initialState = {
  error: null,
  loading: false,
  getProductsSuccess: false,
  hasNextPage: false,
  page: null,
  products: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT.CLEAR_ALL:
    case PRODUCT.ERROR:
      return {
        ...state,
        error: action.payload,
        getProductsSuccess: false,
        hasNextPage: false,
        loading: false,
        products: [],
      };
    case PRODUCT.GET_ALL:
      return {
        ...state,
        getProductsSuccess: true,
        hasNextPage: action.payload.hasNextPage,
        loading: false,
        page: action.payload.page,
        products: action.payload.docs,
      };
    case PRODUCT.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
