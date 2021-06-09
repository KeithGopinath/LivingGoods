import * as COUNT from '../actionTypes/CountByModel';

const initialState = {
};

const CountByModel = (state = initialState, action) => {
  switch (action.type) {
    case COUNT.COUNT_BY_MODEL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case COUNT.COUNT_BY_MODEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countByModel: action.success,
      };
    case COUNT.COUNT_BY_MODEL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default: return state;
  }
};

export default CountByModel;
