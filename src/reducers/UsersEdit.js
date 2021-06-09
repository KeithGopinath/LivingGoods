import * as USERS from '../actionTypes/UsersEdit';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS.USERS_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
        usersEdit: {},
        error: {},
      };
    case USERS.USERS_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersEdit: action.success,
      };
    case USERS.USERS_EDIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case USERS.USERS_EDIT_PAGE:
      return {
        ...state,
        usersEdit: {},
      };
    default:
      return state;
  }
};
