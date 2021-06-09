import * as PROFILE from '../actionTypes/Profile';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE.GET_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PROFILE.GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: action.success,
      };
    case PROFILE.GET_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
