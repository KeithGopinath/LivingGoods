import * as EMAIL from '../actionTypes/EmailSettingsEdit';

const initialState = {};

const emailSettingsEdit = (state = initialState, action) => {
  switch (action.type) {
    case (EMAIL.EMAIL_SETTINGS_EDIT_REQUEST):
      return {
        ...state,
        isLoading: true,
      };
    case (EMAIL.EMAIL_SETTINGS_EDIT_SUCCESS):
      return {
        ...state,
        emailSettingsEdit: action.success,
        isLoading: false,
        error: '',
      };
    case (EMAIL.EMAIL_SETTINGS_EDIT_FAILURE):
      return {
        ...state,
        isLoading: false,
        emailSettingsEdit: [],
        error: action.error,
      };
    default: return state;
  }
};

export default emailSettingsEdit;
