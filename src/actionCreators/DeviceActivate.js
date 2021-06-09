import * as ACTIVATE from '../actionTypes/DeviceActivate';

export const deviceActivateRequest = (payload) => ({
  type: ACTIVATE.DEVICE_ACTIVATE_REQUEST,
  payload,
});

export const deviceActivateSuccess = (success) => ({
  type: ACTIVATE.DEVICE_ACTIVATE_SUCCESS,
  payload: success,
});

export const deviceActivateFailure = (error) => ({
  type: ACTIVATE.DEVICE_ACTIVATE_FAILURE,
  error,
});
