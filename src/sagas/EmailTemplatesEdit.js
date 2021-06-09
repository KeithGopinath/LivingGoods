import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as EMAIL from '../actionTypes/EmailTemplatesEdit';
import * as actionCreators from '../actionCreators/EmailTemplatesEdit';
import { doPut } from '../utils/fetchWrapper';

export function* getEmailTemplatesEditRequest(data) {
  try {
    const { PayLoad } = data;
    const response = yield doPut(`${envConfig.apiEndPoints.getEmailTemplatesEditRequest}${PayLoad.id}`, PayLoad);
    yield put(actionCreators.getEmailTemplatesEditSuccess(response));
  } catch (error) {
    yield put(actionCreators.getEmailTemplatesEditFailure(error));
  }
}

export function* emailTemplatesEditWatchers() {
  yield [
    takeLatest(EMAIL.EMAILTEMPLATES_EDIT_REQUEST, getEmailTemplatesEditRequest),
  ];
}
