import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import { authSagas, authReducer } from "./auth";
import { navigationReducer } from "./navigation";
import { deviceSagas, deviceReducer } from "./devices";

export const rootSaga = function* () {
  yield all([
    authSagas(),
    deviceSagas()
  ])
}

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  auth: authReducer,
  devices: deviceReducer
});