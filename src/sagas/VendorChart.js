/* eslint-disable no-console */
import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as VENDOR from '../actionTypes/VendorChart';
import * as actionCreators from '../actionCreators/VendorChart';
import { doGet } from '../utils/fetchWrapper';

export function* getVendorChartRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getVendorChartRequest);
    yield put(actionCreators.getVendorChartSuccess(response));
  } catch (error) {
    yield put(actionCreators.getVendorChartFailure(error));
  }
}

export function* vendorChartWatchers() {
  yield [
    takeLatest(VENDOR.VENDOR_CHART_REQUEST, getVendorChartRequest),
  ];
}
