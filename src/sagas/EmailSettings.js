import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as EMAIL from '../actionTypes/EmailSettings';
import * as actionCreators from '../actionCreators/EmailSettings';
import { doGet } from '../utils/fetchWrapper';

export function* getEmailSettingsRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getEmailSettingsRequest);
    yield put(actionCreators.getEmailSettingsSuccess(response));
  } catch (error) {
    yield put(actionCreators.getEmailSettingsFailure(error));
  }
}

export function* emailSettingsWatchers() {
  yield [
    takeLatest(EMAIL.EMAIL_SETTINGS_REQUEST, getEmailSettingsRequest),
  ];
}
