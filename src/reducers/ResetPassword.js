import * as RESET_PASSWORD from '../actionTypes/ResetPassword';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        resetPassDetails: null,
      };
    case RESET_PASSWORD.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resetPassDetails: action.success,
      };
    case RESET_PASSWORD.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
