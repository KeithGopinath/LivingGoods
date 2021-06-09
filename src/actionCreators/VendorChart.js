import * as VENDOR from '../actionTypes/VendorChart';


export const getVendorChartRequest = () => ({
  type: VENDOR.VENDOR_CHART_REQUEST,
});

export const getVendorChartSuccess = (success) => ({
  type: VENDOR.VENDOR_CHART_SUCCESS,
  success,
});

export const getVendorChartFailure = (error) => ({
  type: VENDOR.VENDOR_CHART_FAILURE,
  error,
});
