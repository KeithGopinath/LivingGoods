import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as COUNT from '../actionTypes/CountByLocation';
import * as actionCreators from '../actionCreators/CountByLocation';
import { doGet } from '../utils/fetchWrapper';

export function* getCountByLocationRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getCountByLocationRequest);
    yield put(actionCreators.getCountByLocationSuccess(response));
  } catch (error) {
    yield put(actionCreators.getCountByLocationFailure(error));
  }
}

export function* CountByLocationWatchers() {
  yield [
    takeLatest(COUNT.COUNT_BY_LOCATION_REQUEST, getCountByLocationRequest),
  ];
}
