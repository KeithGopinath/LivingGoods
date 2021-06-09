import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as EMAIL from '../actionTypes/EmailTemplates';
import * as actionCreators from '../actionCreators/EmailTemplates';
import { doGet } from '../utils/fetchWrapper';

export function* getEmailTemplatesRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getEmailTemplatesRequest);
    yield put(actionCreators.getEmailTemplatesSuccess(response));
  } catch (error) {
    yield put(actionCreators.getEmailTemplatesFailure(error));
  }
}

export function* emailTemplatesWatchers() {
  yield [
    takeLatest(EMAIL.EMAIL_TEMPLATES_REQUEST, getEmailTemplatesRequest),
  ];
}
