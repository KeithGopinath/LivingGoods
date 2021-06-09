import * as BRANCH from '../actionTypes/Branch';

const initialState = {
};

export default (state = { initialState }, action) => {
  switch (action.type) {
    case BRANCH.BRANCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case BRANCH.BRANCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        branch: action.success,
      };
    case BRANCH.BRANCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
