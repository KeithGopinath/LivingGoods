/* eslint-disable */
import { loginWatchers } from './Login';
import { resetPasswordWatchers } from './ResetPassword';
import { forgotPasswordWatchers } from './ForgotPassword';
import { usersWatchers } from './UsersList';
import { usersNewWatchers } from './UsersNew';
import { usersEditWatchers } from './UsersEdit';
import { rolesWatchers } from './Roles';
import { countryWatchers } from './Country';
import { branchWatchers } from './Branch';
import { devicesWatchers } from './DevicesList';
import { deviceStatusEditWatchers } from './DeviceStatusEdit';
import { deviceStatusWatchers } from './DeviceStatus';
import { emailTemplatesWatchers } from './EmailTemplates';
import { emailTemplatesEditWatchers } from './EmailTemplatesEdit';
import { emailSettingsWatchers } from './EmailSettings';
import { devicesActionsWatchers } from './DevicesActions';
import { profileWatchers } from './Profile';
import { profileEditWatchers } from './ProfileEdit';
import { getCountWatchers } from './Count';
import { emailSettingsEditWatchers } from './EmailSettingsEdit';
import { locationLogRequestWatchers } from './LocationLog';
import { userArchiveWatchers } from './UserArchive';
import { userActivateWatchers } from './UserActivate';
import { deviceArchiveWatchers } from './DeviceArchive';
import { deviceActivateWatchers } from './DeviceActivate';
import { auditLogWatchers } from './AuditLog';
import { vendorChartWatchers } from './VendorChart';
import { statusChartWatchers } from './StatusChart';
import { getHealthWatchers } from './Health';
import { usersSearchWatchers } from './UserSearch';
import { OperationsLogWatchers } from './OperationsLog';
import { usersImportWatchers } from './UsersImport';
import { devicesSearchWatchers } from './DeviceSearch';
import { devicesIdWatchers } from './DevicesId';
import { CountByLocationWatchers } from './CountByLocation';
import { CountByModelWatchers } from './CountByModel';
import { buildVersionWatchers } from './BuildVersion';
import { deviceValidityWatchers } from './DeviceValidity';


export default function* rootWatchers() {
  yield [
    loginWatchers(),
    resetPasswordWatchers(),
    forgotPasswordWatchers(),
    usersWatchers(),
    usersNewWatchers(),
    usersEditWatchers(),
    rolesWatchers(),
    countryWatchers(),
    branchWatchers(),
    devicesWatchers(),
    deviceStatusEditWatchers(),
    deviceStatusWatchers(),
    emailTemplatesWatchers(),
    emailTemplatesEditWatchers(),
    emailSettingsWatchers(),
    devicesActionsWatchers(),
    profileWatchers(),
    getCountWatchers(),
    vendorChartWatchers(),
    statusChartWatchers(),
    profileEditWatchers(),
    emailSettingsEditWatchers(),
    locationLogRequestWatchers(),
    userArchiveWatchers(),
    userActivateWatchers(),
    deviceArchiveWatchers(),
    deviceActivateWatchers(),
    auditLogWatchers(),
    getHealthWatchers(),
    usersSearchWatchers(),
    OperationsLogWatchers(),
    usersImportWatchers(),
    devicesSearchWatchers(),
    devicesIdWatchers(),
    CountByLocationWatchers(),
    CountByModelWatchers(),
    buildVersionWatchers(),
    deviceValidityWatchers(),
  ];
}
