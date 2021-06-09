import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as USERS from '../actionTypes/UsersList';
import * as actionCreators from '../actionCreators/UsersList';
import { doGet } from '../utils/fetchWrapper';

export function* getUsersRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getUsersRequest);
    yield put(actionCreators.getUsersSuccess(response));
  } catch (error) {
    yield put(actionCreators.getUsersFailure(error));
  }
}

export function* usersWatchers() {
  yield [
    takeLatest(USERS.USERS_REQUEST, getUsersRequest),
  ];
}
