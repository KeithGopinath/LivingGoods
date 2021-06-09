import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as COUNT from '../actionTypes/Count';
import * as actionCreators from '../actionCreators/Count';
import { doGet } from '../utils/fetchWrapper';

export function* getCountRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getCountRequest);
    yield put(actionCreators.getCountSuccess(response));
  } catch (error) {
    yield put(actionCreators.getCountFailure(error));
  }
}

export function* getCountWatchers() {
  yield [
    takeLatest(COUNT.GET_COUNT_REQUEST, getCountRequest),
  ];
}
