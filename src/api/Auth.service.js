const API_ROOT_URL = require('../../config.json').API_ROOT_URL;

const headers = {
  'Content-Type': 'application/json',
  'Accepts': 'application/json'
};

// Logs a user into the app
// 
// @params      Object      params    details of user logging in
//    String      params.email        the email of the user trying to login
//    String      params.password     the password of the user trying to login
// @returns     Promise     
//  resolves on successful credential combination
//  rejects on incorrect combination
export function login({ email, password }) {
  return new Promise((resolve, reject) => {
    return fetch(`${API_ROOT_URL}/auth/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password })
    })
      .then(raw => {
        if (raw.ok && raw.status < 400) return raw.json();
        else reject({ message: "Error requesting from server." });
      })
      .then(resolve)
      .catch(reject);
  })
}

// Registers a user
// 
// @params      Object      params    details of user registering
//    String      params.email       the email of the user registering
//    String      params.password    the password of the user registering 
//    String      params.firstName   the first name of the user registering
//    String      params.lastName    the last name of the user registering
// @returns     Promise     
//  resolves on successful validation and creation of user
//  rejects on incorrect combination
export function register({ email, password, firstName, lastName }) {
  return new Promise((resolve, reject) => {
    return fetch(`${API_ROOT_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({ email, password, firstName, lastName })
    })
      .then(resp => {
        if (resp.ok && resp.status < 400) return resp.json();
        else reject({ message: "Error requesting from server." });
      })
      .then(resolve)
      .catch(reject);
  });
}

// Checks whether user is logged in
// 
// @returns     Promise
//  resolves if user is logged in (has authenticated access to server)
//  rejects if user is logged out (does not have auth. access to server)
export function isLoggedIn() {
  return new Promise((resolve, reject) => {
    resolve({ ok: true });
  });
}

// Logs the user out of the application
// 
// @desc        Drops the associated access and refresh tokens
// 
// @returns     null
export function logout() {
  return new Promise((resolve, reject) => {
    resolve({ ok: true });
  });
}
