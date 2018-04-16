import React from 'react';
import { StackNavigator } from 'react-navigation';
import { HouseholdListScreen, HouseholdScreen } from '../Households/screens';
import { GenericHeader } from '../common/components';

import styles from '../common/constants/Colors';
const { primaryColor } = styles;

export default StackNavigator({
  Households: { screen: HouseholdListScreen },
  // Household: { screen: ExpoConfigScreen },
}, {
  initialRouteName: 'Households',
  navigationOptions: {
    header: null,
    headerStyle: { backgroundColor: primaryColor },
    headerTintColor: "#fff",
    headerTitleStyle: { fontWeight: "bold" }
  }
});
