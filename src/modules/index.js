import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import { authSagas, authReducer } from "./auth";

export const rootSaga = function* () {
  yield all([
    authSagas()
  ])
}

export const rootReducer = combineReducers({
  auth: authReducer
});