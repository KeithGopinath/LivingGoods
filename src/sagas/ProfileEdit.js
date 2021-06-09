import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as PROFILE from '../actionTypes/ProfileEdit';
import * as actionCreators from '../actionCreators/ProfileEdit';
import { doPut } from '../utils/fetchWrapper';

export function* profileEditRequest(data) {
  try {
    const { payload } = data;
    const response = yield doPut(`${envConfig.apiEndPoints.profileEditRequest}${payload.id}`, payload);
    yield put(actionCreators.profileEditSuccess(response));
  } catch (error) {
    yield put(actionCreators.profileEditFailure(error));
  }
}

export function* profileEditWatchers() {
  yield [
    takeLatest(PROFILE.PROFILE_EDIT_REQUEST, profileEditRequest),
  ];
}
