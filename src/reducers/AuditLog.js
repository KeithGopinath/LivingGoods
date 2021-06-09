import * as AUDIT from '../actionTypes/AuditLog';


const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUDIT.AUDIT_LOG_REQUEST:
      return {
        ...state,
        isLoading: true,
        auditLogs: [],
      };
    case AUDIT.AUDIT_LOG_SUCCESS:
      return {
        ...state,
        auditLogs: action.payload,
        error: '',
        isLoading: false,
      };
    case AUDIT.AUDIT_LOG_FAILURE:
      return {
        ...state,
        auditLogs: [],
        error: action.error,
        isLoading: false,
      };
    default: return state;
  }
};
