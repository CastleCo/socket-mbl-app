import { put, takeEvery, call, all } from 'redux-saga/effects'
import { DeviceService } from '../../api';

import { NavigationActions } from "react-navigation";
import {
  REPLACE_DEVICE_LIST,
  EXTEND_DEVICE_LIST,
  REFRESH_DEVICES,
  REQUEST_MORE_DEVICES,
  REQUEST_MORE_DEVICES_FAILED,

  TRY_UPDATE_DEVICE_FEATURES,
  UPDATE_DEVICE_FEATURES_FAILED
} from './action-types';

//// REQUESTING DEVICES

export const _replaceDeviceList = function (devices) {
  return { type: REPLACE_DEVICE_LIST, payload: { devices } };
}

const _extendDeviceList = function (devices) {
  return { type: EXTEND_DEVICE_LIST, payload: { devices } };
}

// Starts the request to get a new page of devices
// 
// @param   Number    count     number of devices to request
// @param   Number    offset    number of devices to start loading after
// @param   Number    householdId     Id of household to request
// @returns Action    a `REQUES_MORE_DEVICES` action
export const getMoreDevices = function (count, offset, householdId) {
  return { type: REQUEST_MORE_DEVICES, payload: { count, offset, householdId } };
};

// Execute the getMoreDevices request
export const _getMoreDevicesRequest = function* (action) {
  try {
    // send registration request
    const resp = yield call(DeviceService.getDevices, action.payload);
    // emit registration action
    yield put(_extendDeviceList(resp));
  } catch (err) {
    yield put({ type: REQUEST_MORE_DEVICES_FAILED, error: err });
  }
};

// Watch for getMoreDevice requests
const _watchGetMoreDevicesRequest = function* () {
  yield takeEvery(REQUEST_MORE_DEVICES, _getMoreDevicesRequest);
};

//// UPDATING DEVICES

// Starts the request to get a new page of devices
// 
// @param   Number    count     number of devices to request
// @param   Number    offset    number of devices to start loading after
// @param   Number    householdId     Id of household to request
// @returns Action    a `REQUES_MORE_DEVICES` action
export const updateDeviceFeatures = function (deviceId, features) {
  return { type: TRY_UPDATE_DEVICE_FEATURES, payload: { deviceId, features } };
};

// Execute the getMoreDevices request
export const _tryUpdateDeviceFeatures = function* (action) {
  try {
    // send registration request
    const resp = yield call(DeviceService.updateDeviceFeatures, action.payload);
  } catch (err) {
    yield put({ type: UPDATE_DEVICE_FEATURES_FAILED, error: err });
  }
};

// Watch for getMoreDevice requests
const _watchForTryUpdateDeviceFeatures = function* () {
  yield takeEvery(TRY_UPDATE_DEVICE_FEATURES, _tryUpdateDeviceFeatures);
};

export default function* deviceSagas() {
  yield all([
    _watchGetMoreDevicesRequest()
  ]);
}