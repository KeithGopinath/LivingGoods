import * as DEVICE from '../actionTypes/DeviceStatusEdit';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEVICE.DEVICE_STATUS_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DEVICE.DEVICE_STATUS_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceStatusEdit: action.success,
      };
    case DEVICE.DEVICE_STATUS_EDIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
