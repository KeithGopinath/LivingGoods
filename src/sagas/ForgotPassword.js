import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as FORGOT_PASSWORD from '../actionTypes/ForgotPassword';
import * as forgotPasswordActionCreators from '../actionCreators/ForgotPassword';
import { doPost } from '../utils/fetchWrapper';

export function* getForgotPasswordRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getForgotPasswordRequest, data.forgotPassDetails);
    yield put(forgotPasswordActionCreators.getForgotPasswordSuccess(response));
  } catch (error) {
    yield put(forgotPasswordActionCreators.getForgotPasswordFailure(error));
  }
}

export function* forgotPasswordWatchers() {
  yield [
    takeLatest(FORGOT_PASSWORD.FORGOT_PASSWORD_REQUEST, getForgotPasswordRequest),
  ];
}
