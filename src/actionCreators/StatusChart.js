import * as STATUS from '../actionTypes/StatusChart';


export const getStatusChartRequest = () => ({
  type: STATUS.STATUS_CHART_REQUEST,
});

export const getStatusChartSuccess = (success) => ({
  type: STATUS.STATUS_CHART_SUCCESS,
  success,
});

export const getStatusChartFailure = (error) => ({
  type: STATUS.STATUS_CHART_FAILURE,
  error,
});
