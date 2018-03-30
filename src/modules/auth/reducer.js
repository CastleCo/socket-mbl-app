import {
  REGISTER,
  REGISTER_REQUESTED,
  REGISTER_FAILED,
  LOGIN,
  LOGIN_REQUESTED,
  LOGIN_FAILED,
  LOGOUT,
  LOGOUT_REQUESTED,
} from './action-types';

const initialState = {
  user: null,
  authenticated: false,
  isLoggingIn: false,
  isOnboarding: false,
  form: {}
};

export default authReducer = function (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case REGISTER_REQUESTED:
    case LOGIN_REQUESTED:
      return {
        ...state,
        isLoggingIn: true,
      };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
      return {
        ...state,
        isLoggingIn: false,
        form: {
          ...state.form,
          errors: action.errors,
          error: action.error
        }
      }; 
    case REGISTER:
      return {
        ...state,
        isLoggingIn: false,
        isOnboarding: true,
        authenticated: true,
        user: action.payload.user,
        form: {
          ...state.form,
          errors: {},
          error: {}
        }
      };
    case LOGIN:
      return {
        ...state,
        isLoggingIn: false,
        authenticated: true,
        user: action.payload.user,
        form: {
          ...state.form,
          errors: {},
          error: {}
        }
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        authenticated: false,
        isLoggingIn: false
      };
    default:
      return state;
    }
}