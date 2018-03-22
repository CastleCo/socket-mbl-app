
import { AUTH_REGISTER_ASYNC, AUTH_LOGIN_ASYNC } from '../actionTypes/auth'

export function registerUser(email, password, firstName, lastName) {
  console.log("register action");
  return {
    type: AUTH_REGISTER_ASYNC,
    payload: {
      email,
      password,
      firstName,
      lastName
    }
  }
};

export function loginUser(email, password) {
  console.log("login action");
  return {
    type: AUTH_LOGIN_ASYNC,
    payload: {
      email,
      password,
    }
  }
};
