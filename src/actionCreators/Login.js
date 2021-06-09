import * as LOGIN from '../actionTypes/Login';

export function getLoginRequest(login) {
  return {
    type: LOGIN.LOGIN_REQUEST,
    login,
  };
}

export function getLoginSuccess(success) {
  return {
    type: LOGIN.LOGIN_SUCCESS,
    success,
  };
}

export function getLoginFailure(error) {
  return {
    type: LOGIN.LOGIN_FAILURE,
    error,
  };
}
