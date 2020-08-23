import { PRODUCT } from '../actions/types';

const initialState = {
  current: null,
  error: null,
  loading: false,
  getProductsSuccess: false,
  hasNextPage: false,
  page: null,
  products: null,
  updateProductSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT.CURRENT_CLEAR:
      return {
        ...state,
        current: null,
      };
    case PRODUCT.CURRENT_SET:
      return {
        ...state,
        current: action.payload,
      };
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
    case PRODUCT.UPDATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        updateProductSuccess: false,
      };
    case PRODUCT.UPDATE_RESET:
      return {
        ...state,
        error: null,
        updateProductSuccess: false,
      };
    case PRODUCT.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        updateProductSuccess: true,
      };
    default:
      return state;
  }
};
