import {
  REPLACE_DEVICE_LIST,
  EXTEND_DEVICE_LIST,
  REFRESH_DEVICES,
  REQUEST_MORE_DEVICES,
  REQUEST_MORE_DEVICES_FAILED,
} from './action-types';

const initialState = {
  devices: [],
  numDevices: 0,
  refreshingDevices: false,
  requestingDevices: false,
  deviceLoadingFailed: false,
};

export default authReducer = function (state = initialState, action) {
  switch (action.type) {
    case REPLACE_DEVICE_LIST:
      return {
        ...state,
        devices: action.payload.devices,
        numDevices: action.payload.devices.length,
        refreshingDevices: false,
        requestingDevices: false,
        deviceLoadingFailed: false,
      };
    case EXTEND_DEVICE_LIST:
      const devices = state.devices.concat(action.payload.devices);
      return {
        ...state,
        devices,
        numDevices: devices.length,
        refreshingDevices: false,
        requestingDevices: false,
        deviceLoadingFailed: false,
      };
    case REQUEST_MORE_DEVICES:
      return {
        ...state,
        requestingDevices: true,
        deviceLoadingFailed: false,
      };
    case REQUEST_MORE_DEVICES_FAILED:
      return {
        ...state,
        requestingDevices: false,
        deviceLoadingFailed: true
      };
    default:
      return state;
  }
}