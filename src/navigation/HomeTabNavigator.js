import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import { Header } from 'native-base';

import { MenuButton } from '../components';

import Colors from '../constants/Colors';

import { SocketListScreen } from '../Sockets/screens';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default TabNavigator({
    Sockets   : { screen: SocketListScreen, },
    Groups    : { screen: LinksScreen, },
    Members   : { screen: SettingsScreen, },
  },{
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.routeName}`,
      tabBarIcon: ({ focused }) => {
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
          case 'Members':
            iconName = Platform.OS === 'ios'
              ? `ios-people${focused ? '' : '-outline'}`
              : 'md-people';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    header: Header,
    headerLeft: MenuButton,
    initialRouteName : 'Sockets',
    tabBarComponent: TabBarBottom,
    animationEnabled: true,
    gesturesDisabled: true,
  }
);
