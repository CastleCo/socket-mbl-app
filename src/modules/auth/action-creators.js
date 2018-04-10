import { delay } from 'redux-saga';
import { put, takeEvery, call, all } from 'redux-saga/effects'
import { AuthService } from '../../api';

import { NavigationActions } from "react-navigation";
import {
  REGISTER,
  REGISTER_REQUESTED,
  REGISTER_FAILED,
  LOGOUT,
  LOGOUT_REQUESTED,
  LOGIN,
  LOGIN_REQUESTED,
  LOGIN_FAILED,
} from './action-types';

//// REGISTER

const _register = function (user, accessToken) {
  return { type: REGISTER, payload: { user, accessToken } };
}

export const register = function(email, password, firstName, lastName) {
  return {
    type: REGISTER_REQUESTED,
    payload: { email, password, firstName, lastName }
  };
};

export const registerRequest = function* (action) {
  try {
    // send registration request
    const resp = yield call(AuthService.register, action.payload);
    // emit registration action
    yield put(_register(resp.user, resp.accessToken));
    // move into app
    yield put(NavigationActions.navigate({ routeName: 'App' }));
  } catch (error) {
    yield put({type: REGISTER_FAILED, payload: { error } });
  }
};

// Watch for registration attempts
export const watchRegisterRequest = function*() {
  yield takeEvery(REGISTER_REQUESTED, registerRequest);
};

//// LOGOUT

const _logout = function (user, accessToken) {
  return { type: LOGOUT };
}

export const logout = function (email, password) {
  return { type: LOGOUT_REQUESTED };
};

export const logoutRequest = function* (action) {
  // var { resp, err } = yield call(AuthService.login, action.payload);
  // emit logout action
  yield put(_logout());
  // navigate to login
  yield put(NavigationActions.navigate({ routeName: 'Auth' }));
}

export const watchLogoutRequest = function* () {
  yield takeEvery(LOGOUT_REQUESTED, logoutRequest);
}

//// LOGIN

const _login = function (user, accessToken) {
  return { type: LOGIN, payload: { user, accessToken } };
}

export const login = function (email, password) {
  return { type: LOGIN_REQUESTED, payload: { email, password } };
};

export const loginRequest = function* (action) {
  try {
    // send login request
    const resp = yield call(AuthService.login, action.payload);
    // store user in state
    yield put(_login(resp.user, resp.accessToken));
    // navigate to app
    yield put(NavigationActions.navigate({ routeName: 'App' }));
  } catch (error) {
    yield put({ type: LOGIN_FAILED, payload: { error } });
  }
}

export const watchLoginRequest = function* () {
  yield takeEvery(LOGIN_REQUESTED, loginRequest);
}

export default function* authSagas() {
  yield all([
    watchRegisterRequest(),
    watchLogoutRequest(),
    watchLoginRequest(),
  ]);
}