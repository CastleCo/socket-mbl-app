import React from 'react';
import { StackNavigator } from 'react-navigation';
import { SettingsScreen } from '../Settings/screens';

export default StackNavigator({
  Settings: {
    path: '/settings',
    screen: SettingsScreen
  },
}, {
  headerMode: 'none'
});
