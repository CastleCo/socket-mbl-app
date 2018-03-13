import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import styles from '../common/native-base-theme/variables/castle';
const { btnPrimaryColor, brandPrimary } = styles;

import SettingsNavigator from './SettingsNavigator';
import DeviceTabNavigator from './DeviceTabNavigator';

export default DrawerNavigator({
  Devices: {
    path: '/devices',
    screen: DeviceTabNavigator, // TODO
  },
  // Households: {
  //   path: '/households',
  //   screen: AssistantScreen, // TODO
  // },
  Settings: {
    path: '/settings',
    screen: SettingsNavigator, // TODO
  },
}, {
    initialRouteName: 'Devices',
    contentOptions: {
      activeTintColor: btnPrimaryColor,
      activeBackgroundColor: brandPrimary
  }  
});