import React from 'react';
import { StackNavigator } from 'react-navigation';
import { SettingsScreen, ExpoConfigScreen, ExpoLinksScreen } from '../Settings/screens';

import { Button, Icon } from "native-base";
import styles from '../common/constants/Colors';
const { primaryColor } = styles;

export default StackNavigator({
  Settings: {
    path: '/settings',
    screen: SettingsScreen,
  },
  Config: {
    path: '/config',
    screen: ExpoConfigScreen
  },
  Links: {
    path: '/links',
    screen: ExpoLinksScreen
  },
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
