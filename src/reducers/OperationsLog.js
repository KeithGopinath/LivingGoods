import * as OPERATIONS from '../actionTypes/OperationsLog';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case OPERATIONS.OPERATIONS_LOG_REQUEST:
      return {
        ...state,
        isLoading: true,
        operationsLog: [],
      };
    case OPERATIONS.OPERATIONS_LOG_SUCCESS:
      return {
        ...state,
        operationsLog: action.success,
        // error: '',
        isLoading: false,
      };
    case OPERATIONS.OPERATIONS_LOG_FAILURE:
      return {
        ...state,
        // operationsLog: [],
        error: action.error,
        isLoading: false,
      };
    default: return state;
  }
};
