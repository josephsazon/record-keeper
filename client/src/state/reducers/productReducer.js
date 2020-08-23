import { PRODUCT } from '../actions/types';

const initialState = {
  current: null,
  error: null,
  getProductsLoading: false,
  getProductsSuccess: false,
  hasNextPage: false,
  page: null,
  products: null,
  updateProductLoading: false,
  updateProductSuccess: false,
  updateProductTriggered: false,
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
    case PRODUCT.GET_ALL_FAIL:
      return {
        ...state,
        getProductsLoading: true,
        getProductsSuccess: false,
        hasNextPage: false,
      };
    case PRODUCT.GET_ALL_LOADING:
      return {
        ...state,
        getProductsLoading: true,
      };
    case PRODUCT.GET_ALL_RESET:
      return {
        ...state,
        error: null,
        getProductsLoading: false,
        getProductsSuccess: false,
        hasNextPage: false,
        page: null,
        products: [],
      };
    case PRODUCT.GET_ALL_SUCCESS:
      return {
        ...state,
        getProductsLoading: false,
        getProductsSuccess: true,
        hasNextPage: action.payload.hasNextPage,
        page: action.payload.page,
        products: action.payload.docs,
      };
    case PRODUCT.UPDATE_FAIL:
      return {
        ...state,
        error: action.payload,
        updateProductLoading: false,
        updateProductSuccess: false,
        updateProductTriggered: true,
      };
    case PRODUCT.UPDATE_LOADING:
      return {
        ...state,
        updateProductLoading: true,
      };
    case PRODUCT.UPDATE_RESET:
      return {
        ...state,
        error: null,
        updateProductSuccess: false,
        updateProductTriggered: false,
      };
    case PRODUCT.UPDATE_SUCCESS:
      return {
        ...state,
        updateProductLoading: false,
        updateProductSuccess: true,
        updateProductTriggered: true,
      };
    default:
      return state;
  }
};
