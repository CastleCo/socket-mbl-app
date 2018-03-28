import {
  LOGIN,
  LOGIN_REQUESTED,
  LOGIN_FAILED,
  REGISTER,
  REGISTER_REQUESTED,
  REGISTER_FAILED,
} from './action-types';

const initialState = {
  user: null,
  authenticated: false,
  isLoggingIn: false,
  form: {}
};

export default authReducer = function (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case REGISTER_REQUESTED:
    case LOGIN_REQUESTED:
      return {
        ...state,
        isLoggingIn: true
      }; 
    case REGISTER:
      return {
        ...state,
        isLoggingIn: false,
        onBoarding: true,
        authenticated: true,
        user: action.payload.user
      };
    case LOGIN:
      return {
        ...state,
        isLoggingIn: false,
        authenticated: true,
        user: action.payload.user
      };
    default:
      return state;
    }
}