import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as DEVICES from '../actionTypes/DevicesList';
import * as actionCreators from '../actionCreators/DevicesList';
import { doGet } from '../utils/fetchWrapper';

export function* getDevicesRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getDevicesRequest);
    yield put(actionCreators.getDevicesSuccess(response));
  } catch (error) {
    yield put(actionCreators.getDevicesFailure(error));
  }
}

export function* devicesWatchers() {
  yield [
    takeLatest(DEVICES.DEVICES_REQUEST, getDevicesRequest),
  ];
}
