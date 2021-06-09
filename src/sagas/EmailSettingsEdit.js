import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as EMAIL from '../actionTypes/EmailSettingsEdit';
import * as actionCreators from '../actionCreators/EmailSettingsEdit';
import { doPut } from '../utils/fetchWrapper';

export function* emailSettingsEditRequest(data) {
  try {
    const { payload } = data;
    const response = yield doPut(`${envConfig.apiEndPoints.emailSettingsEditRequest}${payload.id}`, payload);
    yield put(actionCreators.emailSettingsEditSuccess(response));
  } catch (error) {
    yield put(actionCreators.emailSettingsEditFailure(error));
  }
}

export function* emailSettingsEditWatchers() {
  yield [
    takeLatest(EMAIL.EMAIL_SETTINGS_EDIT_REQUEST, emailSettingsEditRequest),
  ];
}
