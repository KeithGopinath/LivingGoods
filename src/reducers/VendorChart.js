import * as VENDOR from '../actionTypes/VendorChart';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VENDOR.VENDOR_CHART_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case VENDOR.VENDOR_CHART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vendorChart: action.success,
      };
    case VENDOR.VENDOR_CHART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
