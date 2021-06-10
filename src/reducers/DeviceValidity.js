import * as DEVICE from '../actionTypes/DeviceValidity';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEVICE.DEVICE_VALIDITY_REQUEST:
      return {
        ...state,
        isLoading: true,
        deviceValidity: false,
        error: false,
      };
    case DEVICE.DEVICE_VALIDITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceValidity: action.success,
      };
    case DEVICE.DEVICE_VALIDITY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
