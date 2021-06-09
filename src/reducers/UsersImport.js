import * as USERS from '../actionTypes/UsersImport';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS.USERS_IMPORT_REQUEST:
      return {
        ...state,
        isLoading: true,
        usersImport: null,
        error: null,
      };
    case USERS.USERS_IMPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersImport: action.success,
      };
    case USERS.USERS_IMPORT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
