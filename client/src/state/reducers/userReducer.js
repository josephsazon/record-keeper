import { USER } from '../actions/types';

const initialState = {
  error: null,
  getUserLoading: false,
  getUserSuccess: false,
  getUserTriggered: false,
  getAllUsersLoading: false,
  getAllUsersSuccess: false,
  getAllUsersTriggered: false,
  hasNextPage: false,
  page: null,
  registerUserLoading: false,
  registerUserSuccess: false,
  registerUserTriggered: false,
  users: null,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER.GET_ONE_FAIL:
      return {
        ...state,
        error: action.payload,
        getUserLoading: false,
        getUserSuccess: false,
        getUserTriggered: true,
      };
    case USER.GET_ONE_LOADING:
      return {
        ...state,
        getUserLoading: true,
      };
    case USER.GET_ONE_RESET:
      return {
        ...state,
        error: action.payload,
        getUserLoading: false,
        getUserSuccess: false,
        getUserTriggered: false,
      };
    case USER.GET_ONE_SUCCESS:
      return {
        ...state,
        getUserLoading: false,
        getUserSuccess: true,
        getUserTriggered: true,
        user: action.payload,
      };
    case USER.GET_ALL_FAIL:
      return {
        ...state,
        error: action.payload,
        getAllUsersLoading: false,
        getAllUsersSuccess: false,
        getAllUsersTriggered: true,
      };
    case USER.GET_ALL_LOADING:
      return {
        ...state,
        getAllUsersLoading: true,
      };
    case USER.GET_ALL_RESET:
      return {
        ...state,
        getAllUsersLoading: false,
        getAllUsersSuccess: false,
        getAllUsersTriggered: false,
      };
    case USER.GET_ALL_SUCCESS:
      return {
        ...state,
        getAllUsersLoading: false,
        getAllUsersSuccess: true,
        getAllUsersTriggered: true,
        hasNextPage: action.payload.hasNextPage,
        page: action.payload.page,
        users: action.payload.docs,
      };
    case USER.REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        registerUserLoading: false,
        registerUserSuccess: false,
        registerUserTriggered: true,
      };
    case USER.REGISTER_LOADING:
      return {
        ...state,
        registerUserLoading: true,
      };
    case USER.REGISTER_RESET:
      return {
        ...state,
        error: null,
        registerUserLoading: false,
        registerUserSuccess: false,
        registerUserTriggered: false,
      };
    case USER.REGISTER_SUCCESS:
      return {
        ...state,
        registerUserLoading: false,
        registerUserSuccess: true,
        registerUserTriggered: true,
      };
    default:
      return state;
  }
};
