import * as USERS from '../actionTypes/UsersList';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS.USERS_REQUEST:
      return {
        ...state,
        usersLoading: true,
        users: [],
        error: {},
      };
    case USERS.USERS_SUCCESS:
      return {
        ...state,
        usersLoading: false,
        users: action.success,
      };
    case USERS.USERS_FAILURE:
      return {
        ...state,
        usersLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
