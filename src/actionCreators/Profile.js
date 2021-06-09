import * as PROFILE from '../actionTypes/Profile';

export const getProfileRequest = () => ({
  type: PROFILE.GET_PROFILE_REQUEST,
});

export const getProfileSuccess = (success) => ({
  type: PROFILE.GET_PROFILE_SUCCESS,
  success,
});

export const getProfileFailure = (error) => ({
  type: PROFILE.GET_PROFILE_FAILURE,
  error,
});
