import * as COUNTRY from '../actionTypes/Country';

export const getCountryRequest = () => ({
  type: COUNTRY.COUNTRY_REQUEST,
});


export const getCountrySuccess = (success) => ({
  type: COUNTRY.COUNTRY_SUCCESS,
  success,
});

export const getCountryFailure = (error) => ({
  type: COUNTRY.COUNTRY_FAILURE,
  error,
});
