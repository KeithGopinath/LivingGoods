import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as ARCHIVE from '../actionTypes/DeviceArchive';
import * as actionCreators from '../actionCreators/DeviceArchive';
import { doDelete } from '../utils/fetchWrapper';

export function* deviceArchiveRequest(data) {
  try {
    const { payload } = data;
    const response = yield doDelete(`${envConfig.apiEndPoints.deviceArchiveRequest}${payload}`);
    yield put(actionCreators.deviceArchiveSuccess(response));
  } catch (error) {
    yield put(actionCreators.deviceArchiveFailure(error));
  }
}

export function* deviceArchiveWatchers() {
  yield [
    takeLatest(ARCHIVE.DEVICE_ARCHIVE_REQUEST, deviceArchiveRequest),
  ];
}
