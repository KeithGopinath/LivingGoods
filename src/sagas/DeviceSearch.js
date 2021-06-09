/* eslint-disable no-console */
import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as DEVICES from '../actionTypes/DeviceSearch';
import * as actionCreators from '../actionCreators/DeviceSearch';
import { doGet } from '../utils/fetchWrapper';

export function* getDevicesSearchRequest(data) {
  try {
    const { searchDevice } = data;
    const response = yield doGet(`${envConfig.apiEndPoints.deviceSearchRequest}${searchDevice}/`);
    yield put(actionCreators.getDevicesSearchSuccess(response));
  } catch (error) {
    yield put(actionCreators.getDevicesSearchFailure(error));
  }
}

export function* devicesSearchWatchers() {
  yield [
    takeLatest(DEVICES.DEVICES_SEARCH_REQUEST, getDevicesSearchRequest),
  ];
}
