import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as COUNTRY from '../actionTypes/Country';
import * as countryActionCreators from '../actionCreators/Country';
import { doGet } from '../utils/fetchWrapper';

export function* getCountryRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getCountryRequest);
    yield put(countryActionCreators.getCountrySuccess(response));
  } catch (error) {
    yield put(countryActionCreators.getCountryFailure(error));
  }
}

export function* countryWatchers() {
  yield [
    takeLatest(COUNTRY.COUNTRY_REQUEST, getCountryRequest),
  ];
}
