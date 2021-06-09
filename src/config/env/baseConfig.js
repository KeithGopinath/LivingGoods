export default {
  apiEndPoints: {
    getLoginRequest: 'mdm/auth-services/login',
    getForgotPasswordRequest: 'mdm/auth-services/forgotpassword',
    getResetPasswordRequest: 'mdm/auth-services/resetpassword',
    // Users
    getUsersViewRequest: 'mdm/user-services/users',
    getUsersRequest: 'mdm/user-services/users',
    getUsersNewRequest: 'mdm/user-services/users',
    getUsersEditRequest: 'mdm/user-services/users/',
    userArchiveRequest: 'mdm/user-services/users/',
    userActivateRequest: 'mdm/user-services/users/activate/',
    userSearchRequest: 'mdm/user-services/usersearch/query/',
    getUsersImportRequest: 'mdm/user-services/users/upload',
    getRolesRequest: 'mdm/user-services/roles/',
    getCountryRequest: 'mdm/user-services/users/country',
    getBranchRequest: 'mdm/user-services/users/branch',
    // Devices
    getDevicesRequest: 'mdm/device-services/devices',
    getDevicesIdRequest: 'mdm/device-services/devices',
    getDevicesNewRequest: 'mdm/device-services/devices',
    getDevicesEditRequest: 'mdm/device-services/devices/',
    locationLogRequest: 'mdm/device-services/devices/location/log/',
    deviceArchiveRequest: 'mdm/device-services/devices/',
    deviceActivateRequest: 'mdm/device-services/devices/activate/',
    auditLogRequest: 'mdm/auditlog-services/auditlog/device/',
    operationsLogRequest: 'mdm/device-services/devices/OperationLog/',
    getDeviceStatusEditRequest: 'mdm/device-services/devices/status/',
    getDeviceStatusRequest: 'mdm/device-services/devices/status',
    getDevicesImportRequest: 'mdm/device-services/devices/upload',
    deviceSearchRequest: 'mdm/device-services/devicesearch/query/',
    // Settings
    getEmailTemplatesRequest: 'mdm/notification-services/emailtemplates',
    getEmailTemplatesEditRequest: 'mdm/notification-services/emailtemplates/',
    getEmailSettingsRequest: 'mdm/notification-services/settings',
    getProfileRequest: 'mdm/user-services/users/profile',
    profileEditRequest: 'mdm/user-services/users/',
    emailSettingsEditRequest: 'mdm/notification-services/settings/',
    // Actions
    getRingDeviceRequest: 'mdm/device-services/devices/actions/ring',
    getMuteDeviceRequest: 'mdm/device-services/devices/actions/mute',
    getLockDeviceRequest: 'mdm/device-services/devices/actions/lock-device',
    getSendMessageRequest: 'mdm/device-services/devices/actions/send-message',
    getSyncInfoRequest: 'mdm/device-services/devices/actions/syn-info',
    // Dashboard
    getCountRequest: 'mdm/device-services/common/count/',
    getHealthRequest: 'mdm/device-services/devices/health',
    getVendorChartRequest: 'mdm/device-services/devices/keyword',
    getStatusChartRequest: 'mdm/device-services/devices/status/devicecount',
    getCountByLocationRequest: 'mdm/device-services/common/location',
    getCountByModelRequest: 'mdm/device-services/common/location/model',
  },
  apiBaseUrl: {
    dev: 'http://mdm-dev-apigw.lg-apps.com:8080/',
    prod: 'http://mdm-demo-apigw.lg-apps.com:8080/',
    test: 'http://54.225.242.42:8080/',
  },
};


// dev: 'http://3.7.169.209:8080/',
// prod: 'http://13.235.216.249:8080/',
// test: 'http://13.235.210.58:8080/',