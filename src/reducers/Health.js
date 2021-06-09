import * as DEVICES from '../actionTypes/Health';

const initialState = {
};

const Count = (state = initialState, action) => {
  switch (action.type) {
    case DEVICES.HEALTH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DEVICES.HEALTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        health: action.success,
      };
    case DEVICES.HEALTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default: return state;
  }
};

export default Count;
