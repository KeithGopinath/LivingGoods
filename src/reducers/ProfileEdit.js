import * as PROFILE from '../actionTypes/ProfileEdit';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE.PROFILE_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case PROFILE.PROFILE_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profileEdit: action.success,
      };
    case PROFILE.PROFILE_EDIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
