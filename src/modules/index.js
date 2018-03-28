import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import { authSagas, authReducer } from "./auth";
import { navigationReducer } from "./navigation";

console.log(navigationReducer);

export const rootSaga = function* () {
  yield all([
    authSagas()
  ])
}

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  auth: authReducer
});