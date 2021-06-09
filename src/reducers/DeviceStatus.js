import * as DEVICE from '../actionTypes/DeviceStatus';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEVICE.DEVICE_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DEVICE.DEVICE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceStatus: action.success,
      };
    case DEVICE.DEVICE_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
