import * as ARCHIVE from '../actionTypes/DeviceArchive';

export const deviceArchiveRequest = (payload) => ({
  type: ARCHIVE.DEVICE_ARCHIVE_REQUEST,
  payload,
});

export const deviceArchiveSuccess = (success) => ({
  type: ARCHIVE.DEVICE_ARCHIVE_SUCCESS,
  payload: success,
});

export const deviceArchiveFailure = (error) => ({
  type: ARCHIVE.DEVICE_ARCHIVE_FAILURE,
  error,
});
