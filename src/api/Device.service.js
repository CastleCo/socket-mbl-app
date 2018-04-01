
const API_ROOT_URL = "/";
const _sockets = require('./sockets.json');

// Gets a page of devices from the
export const getDevices = ({ count, offset }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_sockets.slice(offset, offset + count));
    }, 200)
  });
}

export const getDevice = ({ deviceId }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_sockets[deviceId]);
    }, 200)
  });
}