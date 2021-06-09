import * as COUNT from '../actionTypes/Count';


const initialState = {
};

const Count = (state = initialState, action) => {
  switch (action.type) {
    case COUNT.GET_COUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case COUNT.GET_COUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        count: action.success,
      };
    case COUNT.GET_COUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default: return state;
  }
};

export default Count;
