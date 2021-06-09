import * as DEVICES from '../actionTypes/DevicesId';

export const getDevicesIdRequest = (deviceId) => ({
  type: DEVICES.DEVICES_ID_REQUEST,
  deviceId,
});

export const getDevicesIdSuccess = (success) => ({
  type: DEVICES.DEVICES_ID_SUCCESS,
  success,
});

export const getDevicesIdFailure = (error) => ({
  type: DEVICES.DEVICES_ID_FAILURE,
  error,
});
