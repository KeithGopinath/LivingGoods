import { combineReducers } from 'redux';
import login from './Login';
import resetPassword from './ResetPassword';
import forgotPassword from './ForgotPassword';
import usersList from './UsersList';
import usersNew from './UsersNew';
import usersEdit from './UsersEdit';
import userActivate from './UserActivate';
import userArchive from './UserArchive';
import profileEdit from './ProfileEdit';
import roles from './Roles';
import country from './Country';
import branch from './Branch';
import devicesList from './DevicesList';
import deviceActivate from './DeviceActivate';
import deviceArchive from './DeviceArchive';
import deviceStatusEdit from './DeviceStatusEdit';
import deviceStatus from './DeviceStatus';
import emailTemplates from './EmailTemplates';
import emailTemplatesEdit from './EmailTemplatesEdit';
import emailSettings from './EmailSettings';
import profile from './Profile';
import count from './Count';
import vendorchart from './VendorChart';
import statusChart from './StatusChart';
import emailSettingsEdit from './EmailSettingsEdit';
import locationLog from './LocationLog';
import auditLog from './AuditLog';
import health from './Health';
import userSearch from './UserSearch';
import operationsLog from './OperationsLog';
import usersImport from './UsersImport';
import deviceSearch from './DeviceSearch';
import deviceId from './DevicesId';
import countByLocation from './CountByLocation';
import countByModel from './CountByModel';
import buildVersion from './BuildVersion';
import deviceValidity from './DeviceValidity';


const rootReducer = combineReducers({
  loginState: login,
  resetPasswordState: resetPassword,
  forgotPasswordState: forgotPassword,
  usersState: usersList,
  usersNewState: usersNew,
  usersEditState: usersEdit,
  userActivateState: userActivate,
  userArchiveState: userArchive,
  rolesState: roles,
  countryState: country,
  branchState: branch,
  devicesState: devicesList,
  deviceActivateState: deviceActivate,
  deviceArchiveState: deviceArchive,
  deviceStatusEditState: deviceStatusEdit,
  deviceStatusState: deviceStatus,
  emailTemplatesState: emailTemplates,
  emailTemplatesEditState: emailTemplatesEdit,
  emailSettingsState: emailSettings,
  profileState: profile,
  profileEditState: profileEdit,
  countState: count,
  vendorChartState: vendorchart,
  statusChartState: statusChart,
  emailSettingsEditState: emailSettingsEdit,
  locationLogsState: locationLog,
  auditLogsState: auditLog,
  healthState: health,
  userSearchState: userSearch,
  operationsLogState: operationsLog,
  usersImportState: usersImport,
  deviceSearchState: deviceSearch,
  deviceIdState: deviceId,
  countByLocationState: countByLocation,
  countByModelState: countByModel,
  buildVersionState: buildVersion,
  deviceValidityState: deviceValidity,
});

export default rootReducer;
