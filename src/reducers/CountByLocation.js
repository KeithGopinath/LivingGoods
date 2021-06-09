import * as COUNT from '../actionTypes/CountByLocation';

const initialState = {
};

const CountByLocation = (state = initialState, action) => {
  switch (action.type) {
    case COUNT.COUNT_BY_LOCATION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case COUNT.COUNT_BY_LOCATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countByLocation: action.success,
      };
    case COUNT.COUNT_BY_LOCATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default: return state;
  }
};

export default CountByLocation;
