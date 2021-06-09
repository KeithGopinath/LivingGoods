import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as LOGIN from '../actionTypes/Login';
import * as loginActionCreators from '../actionCreators/Login';
import { doPost } from '../utils/fetchWrapper';

export function* getLoginRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getLoginRequest, data.login);
    yield put(loginActionCreators.getLoginSuccess(response));
    sessionStorage.token = response.token;
    sessionStorage.username = response.username;
    sessionStorage.rolename = response.roleName;
  } catch (error) {
    yield put(loginActionCreators.getLoginFailure(error));
  }
}

export function* loginWatchers() {
  yield [
    takeLatest(LOGIN.LOGIN_REQUEST, getLoginRequest),
  ];
}
