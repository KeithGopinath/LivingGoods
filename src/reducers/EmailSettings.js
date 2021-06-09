import * as EMAIL from '../actionTypes/EmailSettings';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EMAIL.EMAIL_SETTINGS_REQUEST:
      return {
        ...state,
        isLoading: true,
        emailSettings: [],
      };
    case EMAIL.EMAIL_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        emailSettings: action.success,
      };
    case EMAIL.EMAIL_SETTINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
