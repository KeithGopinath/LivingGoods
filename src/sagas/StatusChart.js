/* eslint-disable no-console */
import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as STATUS from '../actionTypes/StatusChart';
import * as actionCreators from '../actionCreators/StatusChart';
import { doGet } from '../utils/fetchWrapper';

export function* getStatusChartRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getStatusChartRequest);
    yield put(actionCreators.getStatusChartSuccess(response));
  } catch (error) {
    yield put(actionCreators.getStatusChartFailure(error));
  }
}

export function* statusChartWatchers() {
  yield [
    takeLatest(STATUS.STATUS_CHART_REQUEST, getStatusChartRequest),
  ];
}
