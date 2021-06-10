import * as DEVICE from '../actionTypes/DeviceValidity';

export const getDeviceValidityRequest = (payload) => ({
  type: DEVICE.DEVICE_VALIDITY_REQUEST,
  payload,
});


export const getDeviceValiditySuccess = (success) => ({
  type: DEVICE.DEVICE_VALIDITY_SUCCESS,
  success,
});

export const getDeviceValidityFailure = (error) => ({
  type: DEVICE.DEVICE_VALIDITY_FAILURE,
  error,
});
