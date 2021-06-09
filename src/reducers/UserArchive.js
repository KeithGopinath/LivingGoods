import * as ARCHIVE from '../actionTypes/UserArchive';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ARCHIVE.USER_ARCHIVE_REQUEST:
      return {
        ...state,
        isLoading: true,
        userArchive: null,
      };
    case ARCHIVE.USER_ARCHIVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userArchive: action.success,
      };
    case ARCHIVE.USER_ARCHIVE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
