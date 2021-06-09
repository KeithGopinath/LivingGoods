import * as STATUS from '../actionTypes/StatusChart';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STATUS.STATUS_CHART_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case STATUS.STATUS_CHART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        statusChart: action.success,
      };
    case STATUS.STATUS_CHART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
