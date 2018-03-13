import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator } from 'react-navigation';
import { Text } from 'native-base';

import styles from '../common/native-base-theme/variables/castle';
const { tabBarTextColor, tabDefaultBg, tabBgColor, activeTab } = styles;

import { SocketListScreen } from '../Sockets/screens';

export default TabNavigator({
    Sockets   : { screen: SocketListScreen, },
    Groups    : { screen: SocketListScreen, },
  },{
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: navigation.state.routeName.toUpperCase(),
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Sockets':
            iconName = Platform.OS === 'ios'
              ? `ios-bulb${focused ? '' : '-outline'}`
              : 'md-bulb';
            break;
          case 'Groups':
            iconName = Platform.OS === 'ios'
              ? `ios-albums${focused ? '' : '-outline'}`
              : 'md-albums';
            break;
          default:
            iconName = Platform.OS === 'ios'
              ? `ios-alert${focused ? '' : '-outline'}`
              : 'md-alert';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            color={tintColor}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: activeTab,
      activeBackgroundColor: "#fff",
      inactiveTintColor: tabBarTextColor,
      inactiveBackgroundColor: "#fff",
    },
    initialRouteName : 'Sockets',
    animationEnabled: true,
  }
);
