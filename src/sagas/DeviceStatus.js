/* eslint-disable no-console */
import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as DEVICE from '../actionTypes/DeviceStatus';
import * as actionCreators from '../actionCreators/DeviceStatus';
import { doGet } from '../utils/fetchWrapper';

export function* getDeviceStatusRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getDeviceStatusRequest);
    yield put(actionCreators.getDeviceStatusSuccess(response));
  } catch (error) {
    yield put(actionCreators.getDeviceStatusFailure(error));
  }
}

export function* deviceStatusWatchers() {
  yield [
    takeLatest(DEVICE.DEVICE_STATUS_REQUEST, getDeviceStatusRequest),
  ];
}
