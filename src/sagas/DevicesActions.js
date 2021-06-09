import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as DEVICES from '../actionTypes/DevicesActions';
import * as actionCreators from '../actionCreators/DevicesActions';
import * as actionCreatorsOperationsLog from '../actionCreators/OperationsLog';
import * as actionCreatorsDevicesId from '../actionCreators/DevicesId';
import { doPost } from '../utils/fetchWrapper';

export function* getRingDeviceRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getRingDeviceRequest, data.deviceId);
    yield put(actionCreators.getRingDeviceSuccess(response));
    yield put(actionCreatorsOperationsLog.operationsLogRequest(data.deviceId.id));
  } catch (error) {
    yield put(actionCreators.getRingDeviceFailure(error));
    yield put(actionCreatorsOperationsLog.operationsLogRequest(data.deviceId.id));
  }
}

export function* getMuteDeviceRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getMuteDeviceRequest, data.deviceId);
    yield put(actionCreators.getMuteDeviceSuccess(response));
    yield put(actionCreatorsOperationsLog.operationsLogRequest(data.deviceId.id));
  } catch (error) {
    yield put(actionCreators.getMuteDeviceFailure(error));
    yield put(actionCreatorsOperationsLog.operationsLogRequest(data.deviceId.id));
  }
}

export function* getLockDeviceRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getLockDeviceRequest, data.deviceId);
    yield put(actionCreators.getLockDeviceSuccess(response));
    yield put(actionCreatorsOperationsLog.operationsLogRequest(data.deviceId.id));
  } catch (error) {
    yield put(actionCreators.getLockDeviceFailure(error));
    yield put(actionCreatorsOperationsLog.operationsLogRequest(data.deviceId.id));
  }
}

export function* getSendMessageRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getSendMessageRequest, data.payload);
    yield put(actionCreators.getSendMessageSuccess(response));
    yield put(actionCreatorsOperationsLog.operationsLogRequest(data.payload.id));
  } catch (error) {
    yield put(actionCreators.getSendMessageFailure(error));
    yield put(actionCreatorsOperationsLog.operationsLogRequest(data.payload.id));
  }
}

export function* getSyncInfoRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getSyncInfoRequest, data.deviceId);
    yield put(actionCreators.getSyncInfoSuccess(response));
    yield put(actionCreatorsDevicesId.getDevicesIdRequest(data.deviceId));
    yield put(actionCreatorsOperationsLog.operationsLogRequest(data.deviceId.id));
  } catch (error) {
    yield put(actionCreators.getSyncInfoFailure(error));
    yield put(actionCreatorsOperationsLog.operationsLogRequest(data.deviceId.id));
  }
}

export function* devicesActionsWatchers() {
  yield [
    takeLatest(DEVICES.RING_DEVICE_REQUEST, getRingDeviceRequest),
    takeLatest(DEVICES.MUTE_DEVICE_REQUEST, getMuteDeviceRequest),
    takeLatest(DEVICES.LOCK_DEVICE_REQUEST, getLockDeviceRequest),
    takeLatest(DEVICES.SEND_MESSAGE_REQUEST, getSendMessageRequest),
    takeLatest(DEVICES.SYNC_INFO_REQUEST, getSyncInfoRequest),
  ];
}
