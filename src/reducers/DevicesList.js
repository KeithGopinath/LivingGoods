import * as DEVICES from '../actionTypes/DevicesList';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEVICES.DEVICES_REQUEST:
      return {
        ...state,
        devicesLoading: true,
        devices: [],
        error: {},
      };
    case DEVICES.DEVICES_SUCCESS:
      return {
        ...state,
        devicesLoading: false,
        devices: action.success,
      };
    case DEVICES.DEVICES_FAILURE:
      return {
        ...state,
        devicesLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
