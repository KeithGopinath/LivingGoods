import * as BUILD from '../actionTypes/BuildVersion';


export const getBuildVersionRequest = (payload) => ({
  type: BUILD.BUILD_VERSION_REQUEST,
  payload,
});

export const getBuildVersionSuccess = (success) => ({
  type: BUILD.BUILD_VERSION_SUCCESS,
  success,
});

export const getBuildVersionFailure = (error) => ({
  type: BUILD.BUILD_VERSION_FAILURE,
  error,
});
