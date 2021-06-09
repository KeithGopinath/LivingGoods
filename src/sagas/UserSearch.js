/* eslint-disable no-console */
import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as USERS from '../actionTypes/UserSearch';
import * as actionCreators from '../actionCreators/UserSearch';
import { doGet } from '../utils/fetchWrapper';

export function* getUsersSearchRequest(data) {
  try {
    const { searchUser } = data;
    const response = yield doGet(`${envConfig.apiEndPoints.userSearchRequest}${searchUser}/`);
    yield put(actionCreators.getUsersSearchSuccess(response));
  } catch (error) {
    yield put(actionCreators.getUsersSearchFailure(error));
  }
}

export function* usersSearchWatchers() {
  yield [
    takeLatest(USERS.USERS_SEARCH_REQUEST, getUsersSearchRequest),
  ];
}
