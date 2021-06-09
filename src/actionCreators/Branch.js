import * as BRANCH from '../actionTypes/Branch';

export const getBranchRequest = () => ({
  type: BRANCH.BRANCH_REQUEST,
});


export const getBranchSuccess = (success) => ({
  type: BRANCH.BRANCH_SUCCESS,
  success,
});

export const getBranchFailure = (error) => ({
  type: BRANCH.BRANCH_FAILURE,
  error,
});
