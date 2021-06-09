import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as RESET_PASSWORD from '../actionTypes/ResetPassword';
import * as resetPasswordActionCreators from '../actionCreators/ResetPassword';
import { doPut } from '../utils/fetchWrapper';

export function* getResetPasswordRequest(data) {
  try {
    const response = yield doPut(`${envConfig.apiEndPoints.getResetPasswordRequest}?token=${data.resetPassDetails.token}`, data.resetPassDetails);
    yield put(resetPasswordActionCreators.getResetPasswordSuccess(response));
  } catch (error) {
    yield put(resetPasswordActionCreators.getResetPasswordFailure(error));
  }
}

export function* resetPasswordWatchers() {
  yield [
    takeLatest(RESET_PASSWORD.RESET_PASSWORD_REQUEST, getResetPasswordRequest),
  ];
}
