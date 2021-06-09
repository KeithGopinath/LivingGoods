import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as LOCATION from '../actionTypes/LocationLog';
import * as actionCreators from '../actionCreators/LocationLog';
import { doGet } from '../utils/fetchWrapper';

export function* locationLogRequest(data) {
  try {
    const { deviceId } = data;
    const response = yield doGet(`${envConfig.apiEndPoints.locationLogRequest}${deviceId}`);
    yield put(actionCreators.locationLogSuccess(response));
  } catch (error) {
    yield put(actionCreators.locationLogFailure(error));
  }
}

export function* locationLogRequestWatchers() {
  yield [
    takeLatest(LOCATION.LOCATION_LOG_REQUEST, locationLogRequest),
  ];
}
