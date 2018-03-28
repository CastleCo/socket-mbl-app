import { addNavigationHelpers } from "react-navigation";
import { RootNavigator } from "../../navigation";

// const firstScreen = RootNavigator.router.getActionForPathAndParams('auth');
// console.log(firstScreen);
// const initialState = RootNavigator.router.getStateForAction(firstScreen);
// console.log(initialState);

export default navigationReducer = function(state , action) {
  let nextState = RootNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}