import * as ARCHIVE from '../actionTypes/UserArchive';

export const userArchiveRequest = (payload) => ({
  type: ARCHIVE.USER_ARCHIVE_REQUEST,
  payload,
});

export const userArchiveSuccess = (success) => ({
  type: ARCHIVE.USER_ARCHIVE_SUCCESS,
  payload: success,
});

export const userArchiveFailure = (error) => ({
  type: ARCHIVE.USER_ARCHIVE_FAILURE,
  error,
});
