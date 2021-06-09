import * as LOCATION from '../actionTypes/LocationLog';

export const locationLogRequest = (deviceId) => ({
  type: LOCATION.LOCATION_LOG_REQUEST,
  deviceId,
});

export const locationLogSuccess = (success) => ({
  type: LOCATION.LOCATION_LOG_SUCCESS,
  payload: success,
});

export const locationLogFailure = (error) => ({
  type: LOCATION.LOCATION_LOG_FAILURE,
  error,
});
