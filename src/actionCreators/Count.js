import * as COUNT from '../actionTypes/Count';


export const getCountRequest = () => ({
  type: COUNT.GET_COUNT_REQUEST,
});

export const getCountSuccess = (success) => ({
  type: COUNT.GET_COUNT_SUCCESS,
  success,
});

export const getCountFailure = (error) => ({
  type: COUNT.GET_COUNT_FAILURE,
  error,
});
