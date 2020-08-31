import { USER } from '../actions/types';

const initialState = {
  error: null,
  getAllUsersLoading: false,
  getAllUsersSuccess: false,
  getAllUsersTriggered: false,
  hasNextPage: false,
  page: null,
  users: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
