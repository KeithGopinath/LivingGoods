import * as ACTIVATE from '../actionTypes/DeviceActivate';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIVATE.DEVICE_ACTIVATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        deviceActivate: null,
      };
    case ACTIVATE.DEVICE_ACTIVATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceActivate: action.success,
      };
    case ACTIVATE.DEVICE_ACTIVATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
