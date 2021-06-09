/* eslint-disable no-console */
import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as OPERATIONS from '../actionTypes/OperationsLog';
import * as actionCreators from '../actionCreators/OperationsLog';
import { doGet } from '../utils/fetchWrapper';

export function* operationsLogRequest(data) {
  try {
    const { deviceId } = data;
    const response = yield doGet(`${envConfig.apiEndPoints.operationsLogRequest}${deviceId}`);
    yield put(actionCreators.operationsLogSuccess(response));
  } catch (error) {
    yield put(actionCreators.operationsLogFailure(error));
  }
}

export function* OperationsLogWatchers() {
  yield [
    takeLatest(OPERATIONS.OPERATIONS_LOG_REQUEST, operationsLogRequest),
  ];
}
