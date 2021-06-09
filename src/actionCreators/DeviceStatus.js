import * as DEVICE from '../actionTypes/DeviceStatus';

export const getDeviceStatusRequest = () => ({
  type: DEVICE.DEVICE_STATUS_REQUEST,
});


export const getDeviceStatusSuccess = (success) => ({
  type: DEVICE.DEVICE_STATUS_SUCCESS,
  success,
});

export const getDeviceStatusFailure = (error) => ({
  type: DEVICE.DEVICE_STATUS_FAILURE,
  error,
});
