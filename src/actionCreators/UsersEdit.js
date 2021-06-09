import * as USERS from '../actionTypes/UsersEdit';

export const getUsersEditRequest = (registerUser) => ({
  type: USERS.USERS_EDIT_REQUEST,
  registerUser,
});

export const getUsersEditSuccess = (success) => ({
  type: USERS.USERS_EDIT_SUCCESS,
  success,
});

export const getUsersEditFailure = (error) => ({
  type: USERS.USERS_EDIT_FAILURE,
  error,
});

export const getUsersEditPage = () => ({
  type: USERS.USERS_EDIT_PAGE,
});
