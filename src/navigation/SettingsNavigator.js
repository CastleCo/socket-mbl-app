import React from 'react';
import { StackNavigator } from 'react-navigation';
import { SettingsScreen, ExpoConfigScreen } from '../Settings/screens';

import styles from '../common/constants/Colors';
const { primaryColor } = styles;

export default StackNavigator({
  Settings: { screen: SettingsScreen },
  Config: { screen: ExpoConfigScreen },
}, {
  initialRouteName: 'Settings',
  navigationOptions: {
    headerStyle: {
      backgroundColor: primaryColor
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  }
});
