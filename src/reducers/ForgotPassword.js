import * as FORGOT_PASSWORD from '../actionTypes/ForgotPassword';

const initialState = {
  // login: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        forgotPassDetails: false,
      };
    case FORGOT_PASSWORD.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        forgotPassDetails: action.success,
      };
    case FORGOT_PASSWORD.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        forgotPassDetails: action.error,
      };
    case FORGOT_PASSWORD.FORGOT_PASSWORD_REDIRECT:
      return {
        ...state,
        forgotPassDetails: false,
      };
    default:
      return state;
  }
};
