import * as USERS from '../actionTypes/UserSearch';

export const getUsersSearchRequest = (searchUser) => ({
  type: USERS.USERS_SEARCH_REQUEST,
  searchUser,
});


export const getUsersSearchSuccess = (success) => ({
  type: USERS.USERS_SEARCH_SUCCESS,
  success,
});

export const getUsersSearchFailure = (error) => ({
  type: USERS.USERS_SEARCH_FAILURE,
  error,
});
