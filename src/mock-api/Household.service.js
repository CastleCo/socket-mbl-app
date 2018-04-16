
const API_ROOT_URL = require('../../config.json').API_ROOT_URL;
const _households = require('./households.json');

// Gets a page of devices from the
export const getHouseholds = ({ count, offset }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_households.slice(offset, offset + count));
    }, 200)
  });
}

export const getHousehold = ({ householdId }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const results = _households.filter(h => h.id === householdId);
      if (results.length > 0) return resolve(results[0]);
      else return reject({ message: "A household with that ID doesn't exist." });
    }, 200)
  });
}