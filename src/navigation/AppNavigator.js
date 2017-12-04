import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import { AssistantScreen } from '../Assistant/screens';
import AssistantNavigator from './AssistantNavigator';
import DeviceTabNavigator from './DeviceTabNavigator';

export default DrawerNavigator({
  Merlin: {
    path: '/app/merlin',
    screen: AssistantScreen, // TODO
  },
  Devices: {
    path: '/app/devices',
    screen: DeviceTabNavigator, // TODO
  },
  Households: {
    path: '/app/households',
    screen: AssistantScreen, // TODO
  },
  Logs: {
    path: '/app/households',
    screen: AssistantScreen, // TODO
  },
  Settings: {
    path: '/app/settings',
    screen: AssistantScreen, // TODO
  },
}, {
  initialRouteName: 'Merlin',
});