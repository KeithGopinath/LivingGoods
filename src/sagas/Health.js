import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as HEALTH from '../actionTypes/Health';
import * as actionCreators from '../actionCreators/Health';
import { doGet } from '../utils/fetchWrapper';

export function* getHealthRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getHealthRequest);
    yield put(actionCreators.getHealthSuccess(response));
  } catch (error) {
    yield put(actionCreators.getHealthFailure(error));
  }
}

export function* getHealthWatchers() {
  yield [
    takeLatest(HEALTH.HEALTH_REQUEST, getHealthRequest),
  ];
}
