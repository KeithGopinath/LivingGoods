import * as DEVICES from '../actionTypes/Health';

export const getHealthRequest = () => ({
  type: DEVICES.HEALTH_REQUEST,
});

export const getHealthSuccess = (success) => ({
  type: DEVICES.HEALTH_SUCCESS,
  success,
});

export const getHealthFailure = (error) => ({
  type: DEVICES.HEALTH_FAILURE,
  error,
});
