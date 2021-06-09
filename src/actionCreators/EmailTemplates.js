import * as EMAIL from '../actionTypes/EmailTemplates';

export const getEmailTemplatesRequest = () => ({
  type: EMAIL.EMAIL_TEMPLATES_REQUEST,
});


export const getEmailTemplatesSuccess = (success) => ({
  type: EMAIL.EMAIL_TEMPLATES_SUCCESS,
  success,
});

export const getEmailTemplatesFailure = (error) => ({
  type: EMAIL.EMAIL_TEMPLATES_FAILURE,
  error,
});
