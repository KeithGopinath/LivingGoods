import * as EMAIL from '../actionTypes/EmailSettingsEdit';

export const emailSettingsEditRequest = (payload) => ({
  type: EMAIL.EMAIL_SETTINGS_EDIT_REQUEST,
  payload,
});

export const emailSettingsEditSuccess = (success) => ({
  type: EMAIL.EMAIL_SETTINGS_EDIT_SUCCESS,
  success,
});

export const emailSettingsEditFailure = (error) => ({
  type: EMAIL.EMAIL_SETTINGS_EDIT_FAILURE,
  error,
});
