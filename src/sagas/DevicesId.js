import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as DEVICES from '../actionTypes/DevicesId';
import * as actionCreators from '../actionCreators/DevicesId';
import { doGet } from '../utils/fetchWrapper';

export function* getDevicesIdRequest(data) {
  try {
    const { deviceId } = data;
    const response = yield doGet(`${envConfig.apiEndPoints.getDevicesIdRequest}/${deviceId.id}`);
    yield put(actionCreators.getDevicesIdSuccess(response));
  } catch (error) {
    yield put(actionCreators.getDevicesIdFailure(error));
  }
}

export function* devicesIdWatchers() {
  yield [
    takeLatest(DEVICES.DEVICES_ID_REQUEST, getDevicesIdRequest),
  ];
}
