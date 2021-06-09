import * as USERS from '../actionTypes/UserSearch';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS.USERS_SEARCH_REQUEST:
      return {
        ...state,
        userSearchLoading: true,
        userSearch: [],
        error: {},
      };
    case USERS.USERS_SEARCH_SUCCESS:
      return {
        ...state,
        userSearchLoading: false,
        userSearch: action.success,
      };
    case USERS.USERS_SEARCH_FAILURE:
      return {
        ...state,
        userSearchLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
