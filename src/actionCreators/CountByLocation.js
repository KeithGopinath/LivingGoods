import * as COUNT from '../actionTypes/CountByLocation';


export const getCountByLocationRequest = () => ({
  type: COUNT.COUNT_BY_LOCATION_REQUEST,
});

export const getCountByLocationSuccess = (success) => ({
  type: COUNT.COUNT_BY_LOCATION_SUCCESS,
  success,
});

export const getCountByLocationFailure = (error) => ({
  type: COUNT.COUNT_BY_LOCATION__FAILURE,
  error,
});
