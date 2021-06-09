import * as EMAIL from '../actionTypes/EmailTemplatesEdit';

export function getEmailTemplatesEditRequest(PayLoad) {
  return {
    type: EMAIL.EMAILTEMPLATES_EDIT_REQUEST,
    PayLoad,
  };
}

export function getEmailTemplatesEditSuccess(success) {
  return {
    type: EMAIL.EMAILTEMPLATES_EDIT_SUCCESS,
    success,
  };
}

export function getEmailTemplatesEditFailure(error) {
  return {
    type: EMAIL.EMAILTEMPLATES_EDIT_FAILURE,
    error,
  };
}
