import * as EMAIL from '../actionTypes/EmailTemplatesEdit';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EMAIL.EMAILTEMPLATES_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case EMAIL.EMAILTEMPLATES_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        emailTemplatesEdit: action.success,
      };
    case EMAIL.EMAILTEMPLATES_EDIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
