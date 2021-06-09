import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as BRANCH from '../actionTypes/Branch';
import * as branchActionCreators from '../actionCreators/Branch';
import { doGet } from '../utils/fetchWrapper';

export function* getBranchRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getBranchRequest);
    yield put(branchActionCreators.getBranchSuccess(response));
  } catch (error) {
    yield put(branchActionCreators.getBranchFailure(error));
  }
}

export function* branchWatchers() {
  yield [
    takeLatest(BRANCH.BRANCH_REQUEST, getBranchRequest),
  ];
}
