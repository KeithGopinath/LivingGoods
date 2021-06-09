/* eslint-disable no-console */
import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as DEVICE from '../actionTypes/DeviceStatusEdit';
import * as actionCreators from '../actionCreators/DeviceStatusEdit';
import { doPut } from '../utils/fetchWrapper';

export function* getDeviceStatusEditRequest(data) {
  try {
    const { payload } = data;
    const payloadBody = { mdmDeviceStatus: payload.mdmDeviceStatus };
    const response = yield doPut(`${envConfig.apiEndPoints.getDeviceStatusEditRequest}${payload.deviceId}`, payloadBody);
    yield put(actionCreators.getDeviceStatusEditSuccess(response));
  } catch (error) {
    yield put(actionCreators.getDeviceStatusEditFailure(error));
  }
}

export function* deviceStatusEditWatchers() {
  yield [
    takeLatest(DEVICE.DEVICE_STATUS_EDIT_REQUEST, getDeviceStatusEditRequest),
  ];
}
