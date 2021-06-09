import * as LOGIN from '../actionTypes/Login';

const initialState = {
  // login: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: [],
      };
    case LOGIN.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        login: action.success,
      };
    case LOGIN.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case LOGIN.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        login: null,
      };
    default:
      return state;
  }
};
