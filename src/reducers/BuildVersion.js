import * as BUILD from '../actionTypes/BuildVersion';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case BUILD.BUILD_VERSION_REQUEST:
      return {
        ...state,
        isLoading: true,
        buildVersion: false,
        error: false,
      };
    case BUILD.BUILD_VERSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        buildVersion: action.success,
      };
    case BUILD.BUILD_VERSION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
