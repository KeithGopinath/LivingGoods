import * as FORGOT_PASSWORD from '../actionTypes/ForgotPassword';

export function getForgotPasswordRequest(forgotPassDetails) {
  return {
    type: FORGOT_PASSWORD.FORGOT_PASSWORD_REQUEST,
    forgotPassDetails,
  };
}

export function getForgotPasswordSuccess(success) {
  return {
    type: FORGOT_PASSWORD.FORGOT_PASSWORD_SUCCESS,
    success,
  };
}

export function getForgotPasswordFailure(error) {
  return {
    type: FORGOT_PASSWORD.FORGOT_PASSWORD_FAILURE,
    error,
  };
}
