import * as ROLES from '../actionTypes/Roles';

const initialState = {
};

export default (state = { initialState }, action) => {
  switch (action.type) {
    case ROLES.ROLES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ROLES.ROLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        roles: action.success,
      };
    case ROLES.ROLES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
