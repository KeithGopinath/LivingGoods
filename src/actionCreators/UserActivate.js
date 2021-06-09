import * as ACTIVATE from '../actionTypes/UserActivate';

export const userActivateRequest = (payload) => ({
  type: ACTIVATE.USER_ACTIVATE_REQUEST,
  payload,
});

export const userActivateSuccess = (success) => ({
  type: ACTIVATE.USER_ACTIVATE_SUCCESS,
  payload: success,
});

export const userActivateFailure = (error) => ({
  type: ACTIVATE.USER_ACTIVATE_FAILURE,
  error,
});
