
import { AUTH_REGISTER_ASYNC } from '../actionTypes/auth'

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
