import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as COUNT from '../actionTypes/CountByModel';
import * as actionCreators from '../actionCreators/CountByModel';
import { doGet } from '../utils/fetchWrapper';

export function* getCountByModelRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getCountByModelRequest);
    yield put(actionCreators.getCountByModelSuccess(response));
  } catch (error) {
    yield put(actionCreators.getCountByModelFailure(error));
  }
}

export function* CountByModelWatchers() {
  yield [
    takeLatest(COUNT.COUNT_BY_MODEL_REQUEST, getCountByModelRequest),
  ];
}
