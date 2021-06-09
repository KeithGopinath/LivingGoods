import * as PROFILE from '../actionTypes/ProfileEdit';

export const profileEditRequest = (payload) => ({
  type: PROFILE.PROFILE_EDIT_REQUEST,
  payload,
});

export const profileEditSuccess = (success) => ({
  type: PROFILE.PROFILE_EDIT_SUCCESS,
  success,
});

export const profileEditFailure = (error) => ({
  type: PROFILE.PROFILE_EDIT_FAILURE,
  error,
});
