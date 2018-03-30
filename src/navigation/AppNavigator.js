import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import styles from '../common/native-base-theme/variables/castle';
const { btnPrimaryColor, brandPrimary } = styles;

import SettingsNavigator from './SettingsNavigator';
import DeviceTabNavigator from './DeviceTabNavigator';

export default DrawerNavigator({
  Devices: { screen: DeviceTabNavigator },
  Settings: { screen: SettingsNavigator },
}, {
  initialRouteName: 'Devices',
  contentOptions: {
    activeTintColor: btnPrimaryColor,
    activeBackgroundColor: brandPrimary
  }  
});