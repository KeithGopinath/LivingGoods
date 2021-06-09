import * as EMAIL from '../actionTypes/EmailTemplates';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EMAIL.EMAIL_TEMPLATES_REQUEST:
      return {
        ...state,
        isLoading: true,
        emailTemplates: [],
      };
    case EMAIL.EMAIL_TEMPLATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        emailTemplates: action.success,
      };
    case EMAIL.EMAIL_TEMPLATES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
