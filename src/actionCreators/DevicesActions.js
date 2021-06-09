import * as DEVICES from '../actionTypes/DevicesActions';

export const getRingDeviceRequest = (deviceId) => ({
  type: DEVICES.RING_DEVICE_REQUEST,
  deviceId,
});

export const getRingDeviceSuccess = (success) => ({
  type: DEVICES.RING_DEVICE_SUCCESS,
  success,
});

export const getRingDeviceFailure = (error) => ({
  type: DEVICES.RING_DEVICE_FAILURE,
  error,
});

export const getMuteDeviceRequest = (deviceId) => ({
  type: DEVICES.MUTE_DEVICE_REQUEST,
  deviceId,
});

export const getMuteDeviceSuccess = (success) => ({
  type: DEVICES.MUTE_DEVICE_SUCCESS,
  success,
});

export const getMuteDeviceFailure = (error) => ({
  type: DEVICES.MUTE_DEVICE_FAILURE,
  error,
});

export const getLockDeviceRequest = (deviceId) => ({
  type: DEVICES.LOCK_DEVICE_REQUEST,
  deviceId,
});

export const getLockDeviceSuccess = (success) => ({
  type: DEVICES.LOCK_DEVICE_SUCCESS,
  success,
});

export const getLockDeviceFailure = (error) => ({
  type: DEVICES.LOCK_DEVICE_FAILURE,
  error,
});

export const getSendMessageRequest = (payload) => ({
  type: DEVICES.SEND_MESSAGE_REQUEST,
  payload,
});

export const getSendMessageSuccess = (success) => ({
  type: DEVICES.SEND_MESSAGE_SUCCESS,
  success,
});

export const getSendMessageFailure = (error) => ({
  type: DEVICES.SEND_MESSAGE_FAILURE,
  error,
});

export const getSyncInfoRequest = (deviceId) => ({
  type: DEVICES.SYNC_INFO_REQUEST,
  deviceId,
});

export const getSyncInfoSuccess = (success) => ({
  type: DEVICES.SYNC_INFO_SUCCESS,
  success,
});

export const getSyncInfoFailure = (error) => ({
  type: DEVICES.SYNC_INFO_FAILURE,
  error,
});

