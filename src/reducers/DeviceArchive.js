import * as ARCHIVE from '../actionTypes/DeviceArchive';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ARCHIVE.DEVICE_ARCHIVE_REQUEST:
      return {
        ...state,
        isLoading: true,
        deviceArchive: null,
      };
    case ARCHIVE.DEVICE_ARCHIVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceArchive: action.success,
      };
    case ARCHIVE.DEVICE_ARCHIVE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
