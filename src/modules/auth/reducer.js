import * as actionTypes from './action-types';

const blankState = {
  user: null,
  authenticated: false,
  isLoggingIn: false,
  form: { error: {}, errors: {} }
};

const initialState = blankState;

export default authReducer = function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.REGISTER.REQUESTED:
    case actionTypes.LOGIN.REQUESTED:
      return { ...state, isLoggingIn: true };
    case actionTypes.REGISTER.FAILED:
    case actionTypes.LOGIN.FAILED:
      return {
        ...state,
        isLoggingIn: false,
        form: {
          errors: action.payload.errors || {},
          error: action.payload.error || {}
        }
      }; 
    case actionTypes.REGISTER.SUCCEEDED:
    case actionTypes.LOGIN.SUCCEEDED:
    case actionTypes.LOGOUT.SUCCEEDED:
    case actionTypes.SET_USER:
      return {
        ...blankState,
        user: action.user,
        authenticated: (action.user !== null) ? true : false
      };
    default:
      return state;
    }
}