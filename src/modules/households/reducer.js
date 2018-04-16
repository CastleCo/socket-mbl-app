import {
  REPLACE_HOUSEHOLD_LIST,
  REFRESH_HOUSEHOLDS,
  REQUEST_MORE_HOUSEHOLDS,
  REQUEST_MORE_HOUSEHOLDS_FAILED,
  
  SET_ACTIVE_HOUSEHOLD,
} from './action-types';

const initialState = {
  households: [],
  numHouseholds: 0,
  isRefreshing: false,
  failedToRefresh: false,
  isLoading: false,
  failedToLoad: false,
  activeHouseholdId: null,
  activeHousehold: {},
};

export default householdReducer = function (state = initialState, action) {
  switch (action.type) {
    case REPLACE_HOUSEHOLD_LIST:
      return {
        ...state,
        // set households
        households: action.payload.households,
        numHouseholds: action.payload.households.length,

        // clear flags
        isRefreshing: false,
        failedToRefresh: false,
        isLoading: false,
        failedToLoad: false,
      };
    case REQUEST_MORE_HOUSEHOLDS:
      return {
        ...state,
        isLoading: true,
        failedToLoad: false,
      };
    case REQUEST_MORE_HOUSEHOLDS_FAILED:
      return {
        ...state,
        isLoading: false,
        failedToLoad: true
      };
    
    case SET_ACTIVE_HOUSEHOLD:
      return {
        ...state,
        activeHouseholdId: action.payload.household.id,
        activeHousehold: action.payload.household
      };
    default:
      return state;
  }
}