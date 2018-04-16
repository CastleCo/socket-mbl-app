import { put, takeEvery, call, all } from 'redux-saga/effects'
import { HouseholdService } from '../../api';

import {
  REPLACE_HOUSEHOLD_LIST,
  REFRESH_HOUSEHOLDS,
  REQUEST_MORE_HOUSEHOLDS,
  REQUEST_MORE_HOUSEHOLDS_FAILED,
  REQUEST_HOUSEHOLD,
  REQUEST_HOUSEHOLD_FAILED,

  REQUEST_ACTIVE_HOUSEHOLD,
  SET_ACTIVE_HOUSEHOLD,
} from './action-types';
import { _replaceDeviceList } from '../devices/action-creators';

//// REQUESTING HOUSEHOLDS

const _replaceList = function (households) {
  return { type: REPLACE_HOUSEHOLD_LIST, payload: { households } };
}

// Starts the request to get a new page of devices
// 
// @param   Number    count     number of devices to request
// @param   Number    offset    number of devices to start loading after
// @returns Action    a `REQUES_MORE_DEVICES` action
export const getMoreHouseholds = function (count, offset) {
  console.log("getting households");
  return { type: REQUEST_MORE_HOUSEHOLDS, payload: { count, offset } };
};

// Execute the getMoreDevices request
export const _requestMoreHouseholds = function* (action) {
  try {
    // send registration request
    const resp = yield call(HouseholdService.getHouseholds, action.payload);
    // emit registration action
    yield put(_replaceList(resp));
  } catch (err) {
    yield put({ type: REQUEST_MORE_HOUSEHOLDS_FAILED, error: err });
  }
};

// Watch for getMoreDevice requests
const _watchForRequestMoreHouseholds = function* () {
  yield takeEvery(REQUEST_MORE_HOUSEHOLDS, _requestMoreHouseholds);
};

//// REQUESTING A HOUSEHOLD

// Starts the request to get a single device
// 
// @param   Number    count     number of devices to request
// @param   Number    offset    number of devices to start loading after
// @returns Action    a `REQUES_MORE_DEVICES` action
export const getHousehold = function (householdId) {
  return { type: REQUEST_HOUSEHOLD, payload: { householdId } };
};

// Execute the getMoreDevices request
export const _getHouseholdRequest = function* (action) {
  try {
    // retrieve housheold
    const resp = yield call(HouseholdService.getHousehold, action.payload);
    // emit navigation action
    // yield put((resp));
  } catch (err) {
    yield put({ type: REQUEST_ACTIVE_HOUSEHOLD_FAILED, error: err });
  }
};

// Sets the active householdId and household
export const requestActiveHousehold = function (householdId) {
  return { type: REQUEST_ACTIVE_HOUSEHOLD, payload: { householdId } };
}

// Watch for a request household action
const _watchForRequestHousehold = function* () {
  yield takeEvery(REQUEST_HOUSEHOLD, _getHouseholdRequest);
};

//// SETTING ACTIVE HOUSEHOLD

// Fetches the detalls for the selected household and sets it
// 
// @param   UUID    householdId   the id of the household to set as active
// @returns   action<REQUEST_ACTIVE_HOUSEHOLD>
export const setActiveHousehold = function (householdId) {
  return { type: REQUEST_ACTIVE_HOUSEHOLD, payload: { householdId } };
}

// Send the request for the household, and set the household on success
export const _requestActiveHousehold = function* (action) {
  try {
    // retrieve housheold
    const household = yield call(HouseholdService.getHousehold, action.payload);
    console.log("household", household);
    // emit set action
    yield put(_setActiveHousehold(household));

    // clear household-dependent lists
    yield put(_replaceDeviceList([]));
  } catch (err) {
    yield put({ type: REQUEST_HOUSEHOLD_FAILED, error: err });
  }
};

// [unsafe] [private] Directly sets the active household id and name
// 
// @param   Object    household
// @returns   action<SET_ACTIVE_HOUSEHOLD>
export const _setActiveHousehold = function (household) {
  return {
    type: SET_ACTIVE_HOUSEHOLD, payload: { household }
  };
}

// Watch for request active households
const _watchForRequestActiveHousehold = function* () {
  yield takeEvery(REQUEST_ACTIVE_HOUSEHOLD, _requestActiveHousehold);
};

export default function* HouseholdsSagas() {
  yield all([
    _watchForRequestMoreHouseholds(),
    _watchForRequestHousehold(),
    _watchForRequestActiveHousehold()
  ]);
}