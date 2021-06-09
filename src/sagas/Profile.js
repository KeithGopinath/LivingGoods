import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as PROFILE from '../actionTypes/Profile';
import * as actionCreators from '../actionCreators/Profile';
import { doGet } from '../utils/fetchWrapper';

export function* getProfileRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getProfileRequest);
    yield put(actionCreators.getProfileSuccess(response));
  } catch (error) {
    yield put(actionCreators.getProfileFailure(error));
  }
}

export function* profileWatchers() {
  yield [
    takeLatest(PROFILE.GET_PROFILE_REQUEST, getProfileRequest),
  ];
}
