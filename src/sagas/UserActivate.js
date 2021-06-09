import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as ACTIVATE from '../actionTypes/UserActivate';
import * as actionCreators from '../actionCreators/UserActivate';
import { doPut } from '../utils/fetchWrapper';

export function* userActivateRequest(data) {
  try {
    const { payload } = data;
    const response = yield doPut(`${envConfig.apiEndPoints.userActivateRequest}${payload}`);
    yield put(actionCreators.userActivateSuccess(response));
  } catch (error) {
    yield put(actionCreators.userActivateFailure(error));
  }
}

export function* userActivateWatchers() {
  yield [
    takeLatest(ACTIVATE.USER_ACTIVATE_REQUEST, userActivateRequest),
  ];
}
