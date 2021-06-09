import * as LOCATION from '../actionTypes/LocationLog';


const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION.LOCATION_LOG_REQUEST:
      return {
        ...state,
        isLoading: true,
        locationLogs: [],
      };
    case LOCATION.LOCATION_LOG_SUCCESS:
      return {
        ...state,
        locationLogs: action.payload,
        error: '',
        isLoading: false,
      };
    case LOCATION.LOCATION_LOG_FAILURE:
      return {
        ...state,
        locationLogs: [],
        error: action.error,
        isLoading: false,
      };
    default: return state;
  }
};
