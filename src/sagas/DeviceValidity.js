/*eslint-disable*/
import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as DEVICE from '../actionTypes/DeviceValidity';
import * as actionCreators from '../actionCreators/DeviceValidity';
import { doPut } from '../utils/fetchWrapper';

export function* getDeviceValidityRequest(data) {
  try {
    const { payload } = data;
    const payloadBody = { validUntilDate: payload.validUntilDate };
    const response = yield doPut(`${envConfig.apiEndPoints.getDeviceValidityRequest}${payload.deviceId}`, payloadBody);
    yield put(actionCreators.getDeviceValiditySuccess(response));
  } catch (error) {
    yield put(actionCreators.getDeviceValidityFailure(error));
  }
}

export function* deviceValidityWatchers() {
  yield [
    takeLatest(DEVICE.DEVICE_VALIDITY_REQUEST, getDeviceValidityRequest),
  ];
}
