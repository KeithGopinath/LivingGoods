import * as RESET_PASSWORD from '../actionTypes/ResetPassword';

export function getResetPasswordRequest(resetPassDetails) {
  return {
    type: RESET_PASSWORD.RESET_PASSWORD_REQUEST,
    resetPassDetails,
  };
}

export function getResetPasswordSuccess(success) {
  return {
    type: RESET_PASSWORD.RESET_PASSWORD_SUCCESS,
    success,
  };
}

export function getResetPasswordFailure(error) {
  return {
    type: RESET_PASSWORD.RESET_PASSWORD_FAILURE,
    error,
  };
}
