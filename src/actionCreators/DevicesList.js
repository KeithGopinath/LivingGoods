import * as DEVICES from '../actionTypes/DevicesList';

export const getDevicesRequest = () => ({
  type: DEVICES.DEVICES_REQUEST,
});


export const getDevicesSuccess = (success) => ({
  type: DEVICES.DEVICES_SUCCESS,
  success,
});

export const getDevicesFailure = (error) => ({
  type: DEVICES.DEVICES_FAILURE,
  error,
});
