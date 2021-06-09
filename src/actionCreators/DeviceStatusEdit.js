import * as DEVICE from '../actionTypes/DeviceStatusEdit';

export const getDeviceStatusEditRequest = (payload) => ({
  type: DEVICE.DEVICE_STATUS_EDIT_REQUEST,
  payload,
});


export const getDeviceStatusEditSuccess = (success) => ({
  type: DEVICE.DEVICE_STATUS_EDIT_SUCCESS,
  success,
});

export const getDeviceStatusEditFailure = (error) => ({
  type: DEVICE.DEVICE_STATUS_EDIT_FAILURE,
  error,
});
