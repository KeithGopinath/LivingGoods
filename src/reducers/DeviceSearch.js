import * as DEVICES from '../actionTypes/DeviceSearch';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEVICES.DEVICES_SEARCH_REQUEST:
      return {
        ...state,
        deviceSearchLoading: true,
        deviceSearch: [],
        error: {},
      };
    case DEVICES.DEVICES_SEARCH_SUCCESS:
      return {
        ...state,
        deviceSearchLoading: false,
        deviceSearch: action.success,
      };
    case DEVICES.DEVICES_SEARCH_FAILURE:
      return {
        ...state,
        deviceSearchLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
