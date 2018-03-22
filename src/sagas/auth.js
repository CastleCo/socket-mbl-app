
import { delay } from 'redux-saga'
import { put, takeEvery, call, all } from 'redux-saga/effects'

import {
    AUTH_LOGIN,
    AUTH_LOGIN_ASYNC,
    AUTH_REGISTER,
    AUTH_REGISTER_ASYNC,
    AUTH_REGISTER_FAIL
} from '../actionTypes/auth'
import api from '../api';

export function* tryLoginAsync(action) {
    console.log("attempting login");
    var { resp, err } = yield call(AuthService.login, action.payload); // TODO: refactor to AuthService call
    if (resp) {
        yield put({
            type: AUTH_LOGIN,
            payload: {
                user: resp.user,
                accessToken: resp.accessToken,
                refreshToken: resp.refreshToken
            }
        });
    } else {
        yield put({
            type: AUTH_LOGIN_FAIL,
            payload: {
                message: err.message
            }
        })
    }
}

export function* watchTryLoginAsync() {
    yield takeEvery(AUTH_LOGIN_ASYNC, tryLoginAsync);
}

export function* tryRegisterAsync(action) {
    console.log("sending registration request...");
    console.log(api.AuthService);
    console.log(action.payload);
    try {
        const resp = yield call(api.AuthService.register, action.payload);
        console.log("in here");
        console.log(resp);
        yield put({
            type: AUTH_REGISTER,
            payload: {
                user: resp.user,
                accessToken: resp.accessToken,
            }
        });
    } catch (err) {
        yield put({
            type: AUTH_REGISTER_FAIL,
            payload: {
                message: err.message
            }
        });
    }
}

export function* watchTryRegisterAsync() {
    yield takeEvery(AUTH_REGISTER_ASYNC, tryRegisterAsync);
}

export default function* authSagas() {
    yield all([
        watchTryLoginAsync(),
        watchTryRegisterAsync()
    ])
}