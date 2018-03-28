import { delay } from 'redux-saga';
import { put, takeEvery, call, all } from 'redux-saga/effects'
import { AuthService } from '../../api';

import { NavigationActions } from "react-navigation";
import {
  LOGIN,
  LOGIN_REQUESTED,
  LOGIN_FAILED,
  REGISTER,
  REGISTER_REQUESTED,
  REGISTER_FAILED
} from './action-types';

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
    const resp = yield call(AuthService.register, action.payload);
    console.log(resp);
    yield put(_register(resp.user, resp.accessToken));

    // navigate to app
    // const action = NavigationActions.reset({
    //   index: 0,
    //   key: null,
    //   actions: [
    //     NavigationActions.navigate({ routeName: 'App' })
    //   ]
    // });
    yield put(NavigationActions.navigate({ routeName: 'App' }));
  } catch (err) {
    console.log(err);
    yield put({ type: AUTH_REGISTER_FAIL, payload: { message: err.message } });
  }
};

// Watch for registration attempts
export const watchTryRegisterAsync = function*() {
  yield takeEvery(REGISTER_REQUESTED, registerRequest);
};

export const login = function (email, password) {
  console.log("login action");
  return { type: LOGIN_REQUESTED, payload: { email, password } };
};

export const tryLoginAsync = function* (action) {
  console.log("attempting login");
  var { resp, err } = yield call(AuthService.login, action.payload); // TODO: refactor to AuthService call
  if (resp) {
    yield put({
      type: LOGIN,
      payload: { user: resp.user, accessToken: resp.accessToken, refreshToken: resp.refreshToken
      }
    });
  } else {
    yield put({
      type: LOGIN_FAILED,
      payload: { message: err.message }
    })
  }
}

export const watchTryLoginAsync = function* () {
  yield takeEvery(LOGIN_REQUESTED, tryLoginAsync);
}

export default function* authSagas() {
  yield all([
    watchTryRegisterAsync(),
    watchTryLoginAsync(),
  ]);
}