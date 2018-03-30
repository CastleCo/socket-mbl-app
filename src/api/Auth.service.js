
const ROOT_URL = "/";

// Logs a user into the app
// 
// @params      String      email       the email of the user trying to login
// @params      String      password    the password of the user trying to login
// @returns     Promise     
//  resolves on successful credential combination
//  rejects on incorrect combination
export function login({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        user: { id: 42, email },
        accessToken: '42',
      });
    }, 200);
  });
}

// Registers a user
// 
// @params      String      email       the email of the user registering
// @params      String      password    the password of the user registering 
// @params      String      firstName   the first name of the user registering
// @params      String      lastName    the last name of the user registering
// @returns     Promise     
//  resolves on successful validation and creation of user
//  rejects on incorrect combination
export function register({ email, password, firstName, lastName }) {
  console.log("sending fetch");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        user: { id: 42, email, firstName, lastName },
        accessToken: "42"
      });
    }, 1000);
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
// @desc        Drops the associated acess and refresh tokens
// 
// @returns     null
export function logout() {
  console.log(`[${(new Date()).toString()}] logout user=${this.user.id}`);
  return new Promise((resolve, reject) => {
    resolve({ ok: true });
  });
}
