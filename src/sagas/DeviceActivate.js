import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as ACTIVATE from '../actionTypes/DeviceActivate';
import * as actionCreators from '../actionCreators/DeviceActivate';
import { doPut } from '../utils/fetchWrapper';

export function* deviceActivateRequest(data) {
  try {
    const { payload } = data;
    const response = yield doPut(`${envConfig.apiEndPoints.deviceActivateRequest}${payload}`);
    yield put(actionCreators.deviceActivateSuccess(response));
  } catch (error) {
    yield put(actionCreators.deviceActivateFailure(error));
  }
}

export function* deviceActivateWatchers() {
  yield [
    takeLatest(ACTIVATE.DEVICE_ACTIVATE_REQUEST, deviceActivateRequest),
  ];
}
