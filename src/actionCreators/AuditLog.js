import * as AUDIT from '../actionTypes/AuditLog';

export const auditLogRequest = (deviceId) => ({
  type: AUDIT.AUDIT_LOG_REQUEST,
  deviceId,
});

export const auditLogSuccess = (success) => ({
  type: AUDIT.AUDIT_LOG_SUCCESS,
  payload: success,
});

export const auditLogFailure = (error) => ({
  type: AUDIT.AUDIT_LOG_FAILURE,
  error,
});
