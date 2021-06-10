import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as BUILD from '../actionTypes/BuildVersion';
import * as buildVersionActionCreators from '../actionCreators/BuildVersion';
import { doPost } from '../utils/fetchWrapper';

export function* getBuildVersionRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getBuildVersionRequest, data.payload);
    yield put(buildVersionActionCreators.getBuildVersionSuccess(response));
  } catch (error) {
    yield put(buildVersionActionCreators.getBuildVersionFailure(error));
  }
}

export function* buildVersionWatchers() {
  yield [
    takeLatest(BUILD.BUILD_VERSION_REQUEST, getBuildVersionRequest),
  ];
}
