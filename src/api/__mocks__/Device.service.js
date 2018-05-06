
const API_ROOT_URL = require('../../config.json').API_ROOT_URL;
const _devices = require('./devices.json');

const headers = {
  'Content-Type': 'application/json',
  'Accepts': 'application/json'
};

// Gets a page of devices from the
export const getDevices = ({ count, offset, householdId }) => {
  return new Promise((resolve, reject) => {
    // setTimeout(() => {
    //   // if household specified
    //   var devices;
    //   if (householdId !== undefined) { 
    //     devices = _devices.filter(d => d.household === householdId);
    //   }
    //   else {
    //     devices = _devices;
    //   }
    //   resolve(devices.slice(offset, offset + count));
    // }, 200)
    return fetch(`${API_ROOT_URL}/household/${householdId}/devices`, {
      headers
    })
      .then(raw => {
        if (raw.ok && raw.status < 400) return raw.json();
        else reject({ message: "Error requesting from server." });
      })
      .then(resolve)
      .catch(reject);
  });
}

export const getDevice = ({ deviceId }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const results = _devices.filter(d => d.id === deviceId);
      if (results.length > 0) return resolve(results[0]);
      else return reject({ message: "A device with that ID doesn't exist." });
    }, 200)
  });
}

export const updateDeviceFeatures = ({ deviceId, features }) => {
  return new Promise((resolve, reject) => {
    return fetch(`${API_ROOT_URL}/devices/${deviceId}`, {
      method: "POST",
      headers: {},
      body: JSON.stringify(features)
    })
      .then(raw => {
        if (raw.ok && raw.status < 400) return raw.json();
        else reject({ message: "Error requesting from server." });
      })  
      .then(resolve)
      .catch(reject)
  });
}