import * as OPERATIONS from '../actionTypes/OperationsLog';

export const operationsLogRequest = (deviceId) => ({
  type: OPERATIONS.OPERATIONS_LOG_REQUEST,
  deviceId,
});

export const operationsLogSuccess = (success) => ({
  type: OPERATIONS.OPERATIONS_LOG_SUCCESS,
  success,
});

export const operationsLogFailure = (error) => ({
  type: OPERATIONS.OPERATIONS_LOG_FAILURE,
  error,
});
