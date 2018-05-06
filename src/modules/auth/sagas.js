import { authorize, clear } from "@shoutem/fetch-token-intercept";
import { put, takeEvery, call, all } from 'redux-saga/effects';

import { NavigationActions } from "react-navigation";
import * as actionTypes from './action-types';
import * as actions from "./actions";

import * as  AuthService from '../../api/Auth.service';

//// LOGIN

export const requestLogin = function* (action) {
  try {
    // send login request
    const resp = yield call(AuthService.login, action.payload);
    // TODO: remove once access token and refresh token are differentiated
    const accessToken = resp.token;
    const refreshToken = resp.token;
    // store user in state
    yield put(actions.setUser(resp.user));
    // store tokens (refesh, access)
    yield call(authorize, refreshToken, accessToken);
    // navigate to app
    yield put(NavigationActions.navigate({ routeName: 'App' }));
  } catch (error) {
    yield put({ type: actionTypes.LOGIN.FAILED, payload: { error } });
  }
}

export const watchForLoginRequest = function* () {
  yield takeEvery(actionTypes.LOGIN.REQUESTED, requestLogin);
}

//// REGISTER

export const requestRegister = function* (action) {
  try {
    // send registration request
    const resp = yield call(AuthService.register, action.payload);
    // TODO: remove once access token and refresh token are differentiated
    const accessToken = resp.token;
    const refreshToken = resp.token;
    // save user
    yield put(actions.setUser(resp.user));
    // store tokens (refesh, access)
    yield call(authorize, refreshToken, accessToken);
    // move into app
    yield put(NavigationActions.navigate({ routeName: 'App' }));
  } catch (error) {
    yield put({ type: actionTypes.REGISTER.FAILED, payload: { error } });
  }
};

// TODO: [blocking] Watch for registration attempts
export const watchForRegisterRequest = function* () {
  yield takeEvery(actionTypes.REGISTER.REQUESTED, requestRegister);
};

//// LOGOUT

export const requestLogout = function* (action) {
  // unset user
  yield put(actions.setUser(null));
  // clear stored tokens
  yield call(clear);
  // navigate to login
  yield put(NavigationActions.navigate({ routeName: 'Auth' }));
}

export const watchForLogoutRequest = function* () {
  yield takeEvery(actionTypes.LOGOUT.REQUESTED, requestLogout);
}

export default function* authSagas() {
  yield all([
    watchForLoginRequest(),
    watchForRegisterRequest(),
    watchForLogoutRequest(),
  ]);
}