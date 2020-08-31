import { PRODUCT } from '../actions/types';

const initialState = {
  current: null,
  error: null,
  getProductsLoading: false,
  getProductsSuccess: false,
  getProductsTriggered: false,
  hasNextPage: false,
  page: null,
  products: null,
  submitProductLoading: false,
  submitProductSuccess: false,
  submitProductTriggered: false,
  totalDocs: null,
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
        error: action.payload,
        getProductsLoading: true,
        getProductsSuccess: false,
        getProductsTriggered: true,
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
        getProductsTriggered: false,
      };
    case PRODUCT.GET_ALL_SUCCESS:
      return {
        ...state,
        getProductsLoading: false,
        getProductsSuccess: true,
        getProductsTriggered: true,
        hasNextPage: action.payload.hasNextPage,
        page: action.payload.page,
        products: action.payload.docs,
        totalDocs: action.payload.totalDocs,
      };
    case PRODUCT.SUBMIT_FAIL:
      return {
        ...state,
        error: action.payload,
        submitProductLoading: false,
        submitProductSuccess: false,
        submitProductTriggered: true,
      };
    case PRODUCT.SUBMIT_LOADING:
      return {
        ...state,
        submitProductLoading: true,
      };
    case PRODUCT.SUBMIT_RESET:
      return {
        ...state,
        error: null,
        submitProductSuccess: false,
        submitProductTriggered: false,
      };
    case PRODUCT.SUBMIT_SUCCESS:
      return {
        ...state,
        submitProductLoading: false,
        submitProductSuccess: true,
        submitProductTriggered: true,
      };
    default:
      return state;
  }
};
