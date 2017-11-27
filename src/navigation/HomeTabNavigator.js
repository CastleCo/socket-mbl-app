import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator } from 'react-navigation';

import { Header, Title } from 'native-base';

import { MenuButton } from '../components';

import Colors from '../constants/Colors';

import { SocketListScreen } from '../Sockets/screens';

export default TabNavigator({
    Sockets   : { screen: SocketListScreen, },
    Groups    : { screen: SocketListScreen, },
  },{
    navigationOptions: ({ navigation }) => ({
      headerTitle: (<Title>{navigation.state.routeName}</Title>),
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
          default:
          iconName = Platform.OS === 'ios'
            ? `ios-alert${focused ? '' : '-outline'}`
            : 'md-alert';
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
    headerRight: MenuButton,
    // initialRouteName : 'Sockets',
    animationEnabled: true,
    gesturesDisabled: true,
  }
);
