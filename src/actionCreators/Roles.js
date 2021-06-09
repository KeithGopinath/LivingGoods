import * as ROLES from '../actionTypes/Roles';

export const getRolesRequest = () => ({
  type: ROLES.ROLES_REQUEST,
});


export const getRolesSuccess = (success) => ({
  type: ROLES.ROLES_SUCCESS,
  success,
});

export const getRolesFailure = (error) => ({
  type: ROLES.ROLES_FAILURE,
  error,
});
