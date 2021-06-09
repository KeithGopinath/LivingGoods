import * as COUNT from '../actionTypes/CountByModel';


export const getCountByModelRequest = () => ({
  type: COUNT.COUNT_BY_MODEL_REQUEST,
});

export const getCountByModelSuccess = (success) => ({
  type: COUNT.COUNT_BY_MODEL_SUCCESS,
  success,
});

export const getCountByModelFailure = (error) => ({
  type: COUNT.COUNT_BY_MODEL__FAILURE,
  error,
});
