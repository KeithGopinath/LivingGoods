import * as COUNTRY from '../actionTypes/Country';

const initialState = {
};

export default (state = { initialState }, action) => {
  switch (action.type) {
    case COUNTRY.COUNTRY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case COUNTRY.COUNTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        country: action.success,
      };
    case COUNTRY.COUNTRY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
