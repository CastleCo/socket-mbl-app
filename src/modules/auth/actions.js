import * as actionTypes from './action-types';

export const setUser = function (user) {
  return { type: actionTypes.SET_USER, user };
};

export const setTokens = function (refreshToken, accessToken) {
  return { type: actionTypes.SET_TOKENS, refreshToken, accessToken };
};

export const register = function(email, password, firstName, lastName) {
  return {
    type: actionTypes.REGISTER.REQUESTED,
    payload: { email, password, firstName, lastName }
  };
};

export const login = function (email, password) {
  return { type: actionTypes.LOGIN.REQUESTED, payload: { email, password } };
};

export const logout = function () {
  return { type: actionTypes.LOGOUT.REQUESTED };
};