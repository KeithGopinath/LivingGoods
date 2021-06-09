import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as USERS from '../actionTypes/UsersImport';
import * as actionCreators from '../actionCreators/UsersImport';
import { doPostFile } from '../utils/fetchWrapper';

export function* getUsersImportRequest(data) {
  try {
    const { formData } = data;
    const response = yield doPostFile(envConfig.apiEndPoints.getUsersImportRequest, formData);
    yield put(actionCreators.getUsersImportSuccess(response));
  } catch (error) {
    yield put(actionCreators.getUsersImportFailure(error));
  }
}

export function* usersImportWatchers() {
  yield [
    takeLatest(USERS.USERS_IMPORT_REQUEST, getUsersImportRequest),
  ];
}
