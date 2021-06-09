import * as EMAIL from '../actionTypes/EmailSettings';

export const getEmailSettingsRequest = () => ({
  type: EMAIL.EMAIL_SETTINGS_REQUEST,
});


export const getEmailSettingsSuccess = (success) => ({
  type: EMAIL.EMAIL_SETTINGS_SUCCESS,
  success,
});

export const getEmailSettingsFailure = (error) => ({
  type: EMAIL.EMAIL_SETTINGS_FAILURE,
  error,
});
