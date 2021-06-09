import * as DEVICES from '../actionTypes/DevicesId';

const initialState = {
  devicesId: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEVICES.DEVICES_ID_REQUEST:
      return {
        ...state,
        devicesIdLoading: true,
        devicesId: {},
        error: {},
      };
    case DEVICES.DEVICES_ID_SUCCESS:
      return {
        ...state,
        devicesIdLoading: false,
        devicesId: action.success,
      };
    case DEVICES.DEVICES_ID_FAILURE:
      return {
        ...state,
        devicesIdLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
