import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as USERS from '../actionTypes/UsersEdit';
import * as actionCreators from '../actionCreators/UsersEdit';
import { doPut } from '../utils/fetchWrapper';

export function* getUsersEditRequest(data) {
  try {
    const { registerUser } = data;
    const response = yield doPut(`${envConfig.apiEndPoints.getUsersEditRequest}${registerUser.id}`, registerUser);
    yield put(actionCreators.getUsersEditSuccess(response));
  } catch (error) {
    yield put(actionCreators.getUsersEditFailure(error));
  }
}

export function* usersEditWatchers() {
  yield [
    takeLatest(USERS.USERS_EDIT_REQUEST, getUsersEditRequest),
  ];
}
