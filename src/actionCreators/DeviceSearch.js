import * as DEVICES from '../actionTypes/DeviceSearch';

export const getDevicesSearchRequest = (searchDevice) => ({
  type: DEVICES.DEVICES_SEARCH_REQUEST,
  searchDevice,
});


export const getDevicesSearchSuccess = (success) => ({
  type: DEVICES.DEVICES_SEARCH_SUCCESS,
  success,
});

export const getDevicesSearchFailure = (error) => ({
  type: DEVICES.DEVICES_SEARCH_FAILURE,
  error,
});
