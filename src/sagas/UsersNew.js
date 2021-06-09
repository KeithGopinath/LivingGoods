import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as USERS from '../actionTypes/UsersNew';
import * as actionCreators from '../actionCreators/UsersNew';
import { doPost } from '../utils/fetchWrapper';

export function* getUsersNewRequest(data) {
  try {
    const { registerUser } = data;
    const response = yield doPost(envConfig.apiEndPoints.getUsersNewRequest, registerUser);
    yield put(actionCreators.getUsersNewSuccess(response));
  } catch (error) {
    yield put(actionCreators.getUsersNewFailure(error));
  }
}

export function* usersNewWatchers() {
  yield [
    takeLatest(USERS.USERS_NEW_REQUEST, getUsersNewRequest),
  ];
}
