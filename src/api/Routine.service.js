
const API_ROOT_URL = require('../../config.json').API_ROOT_URL;
const _routines = require('./routines.json');

// Gets a page of routines from the
export const getRoutines = ({ count, offset, householdId }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      // if household specified
      var routines;
      if (householdId !== undefined) { 
        routines = _routines.filter(d => d.household === householdId);
      }
      else {
        routines = _routines;
      }
      resolve(routines.slice(offset, offset + count));
    }, 200)
  });
}

export const getRoutine = ({ routineId }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const results = _routines.filter(r => r.id === routineId);
      if (results.length > 0) return resolve(results[0]);
      else return reject({ message: "A Routine with that ID doesn't exist." });
    }, 200)
  });
}