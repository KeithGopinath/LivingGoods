import * as USERS from '../actionTypes/UsersNew';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS.USERS_NEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        usersNew: {},
        error: {},
      };
    case USERS.USERS_NEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersNew: action.success,
      };
    case USERS.USERS_NEW_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case USERS.USERS_NEW_PAGE:
      return {
        ...state,
        usersNew: {},
      };
    default:
      return state;
  }
};
