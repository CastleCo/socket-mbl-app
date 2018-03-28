import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

export const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navigation,
);
export const addListener = createReduxBoundAddListener("root");
export { default as navigationReducer } from "./reducer";

