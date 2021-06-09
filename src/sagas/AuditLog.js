import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as AUDIT from '../actionTypes/AuditLog';
import * as actionCreators from '../actionCreators/AuditLog';
import { doGet } from '../utils/fetchWrapper';

export function* auditLogRequest(data) {
  try {
    const { deviceId } = data;
    const response = yield doGet(`${envConfig.apiEndPoints.auditLogRequest}${deviceId}`);
    yield put(actionCreators.auditLogSuccess(response));
  } catch (error) {
    yield put(actionCreators.auditLogFailure(error));
  }
}

export function* auditLogWatchers() {
  yield [
    takeLatest(AUDIT.AUDIT_LOG_REQUEST, auditLogRequest),
  ];
}
