import * as ACTIVATE from '../actionTypes/UserActivate';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIVATE.USER_ACTIVATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        userActivate: null,
      };
    case ACTIVATE.USER_ACTIVATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userActivate: action.success,
      };
    case ACTIVATE.USER_ACTIVATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
