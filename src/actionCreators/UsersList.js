import * as USERS from '../actionTypes/UsersList';

export const getUsersRequest = () => ({
  type: USERS.USERS_REQUEST,
});


export const getUsersSuccess = (success) => ({
  type: USERS.USERS_SUCCESS,
  success,
});

export const getUsersFailure = (error) => ({
  type: USERS.USERS_FAILURE,
  error,
});
