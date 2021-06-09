import * as USERS from '../actionTypes/UsersImport';

export const getUsersImportRequest = (formData) => ({
  type: USERS.USERS_IMPORT_REQUEST,
  formData,
});


export const getUsersImportSuccess = (success) => ({
  type: USERS.USERS_IMPORT_SUCCESS,
  success,
});

export const getUsersImportFailure = (error) => ({
  type: USERS.USERS_IMPORT_FAILURE,
  error,
});
