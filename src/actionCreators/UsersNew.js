import * as USERS from '../actionTypes/UsersNew';

export const getUsersNewRequest = (registerUser) => ({
  type: USERS.USERS_NEW_REQUEST,
  registerUser,
});


export const getUsersNewSuccess = (success) => ({
  type: USERS.USERS_NEW_SUCCESS,
  success,
});

export const getUsersNewFailure = (error) => ({
  type: USERS.USERS_NEW_FAILURE,
  error,
});

export const getUsersNewPage = () => ({
  type: USERS.USERS_NEW_PAGE,
});
