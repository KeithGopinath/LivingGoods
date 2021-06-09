import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as ARCHIVE from '../actionTypes/UserArchive';
import * as actionCreators from '../actionCreators/UserArchive';
import { doDelete } from '../utils/fetchWrapper';

export function* userArchiveRequest(data) {
  try {
    const { payload } = data;
    const response = yield doDelete(`${envConfig.apiEndPoints.userArchiveRequest}${payload}`);
    yield put(actionCreators.userArchiveSuccess(response));
  } catch (error) {
    yield put(actionCreators.userArchiveFailure(error));
  }
}

export function* userArchiveWatchers() {
  yield [
    takeLatest(ARCHIVE.USER_ARCHIVE_REQUEST, userArchiveRequest),
  ];
}
