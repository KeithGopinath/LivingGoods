import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as ROLES from '../actionTypes/Roles';
import * as rolesActionCreators from '../actionCreators/Roles';
import { doGet } from '../utils/fetchWrapper';

export function* getRolesRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getRolesRequest);
    yield put(rolesActionCreators.getRolesSuccess(response));
  } catch (error) {
    yield put(rolesActionCreators.getRolesFailure(error));
  }
}

export function* rolesWatchers() {
  yield [
    takeLatest(ROLES.ROLES_REQUEST, getRolesRequest),
  ];
}
