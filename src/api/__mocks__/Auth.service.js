const USERS = require('./users.json');

export const filterForEmail = (users, email) => {
  return users.filter(u => u.email === email);
}

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
    process.nextTick(() => {
      var users = filterForEmail(USERS, email)
        .filter(u => u.password === password);
      if (users.length > 0) {
        const token = "randomToken";
        return resolve({ user: users[0], token, refreshToken: token, accessToken: token });
      } else {
        return reject({ message: "Incorrect email & password combination." });
      }
    });
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
    setTimeout(() => {
      var users = filterForEmail(USERS, email);
      if (users.length > 0) {
        reject({ error: { message: "A user with that email already exists." } });
      } else {
        user = {
          email,
          password,
          profile: {
            firstName,
            lastName,
            birthday: "",
            phoneNumber: ""
          }
        };
        USERS.push(user);
        return user;
      }
    }, 200);
  })
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
