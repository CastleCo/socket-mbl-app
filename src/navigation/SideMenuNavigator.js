import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigator } from 'react-navigation';
import { Header } from 'native-base';

import Colors from '../constants/Colors';

import HomeTabNavigator from './HomeTabNavigator';

import { MenuButton } from '../components';
import { SideMenuScreen } from '../screens';

export default DrawerNavigator({
    Households  : { screen: HomeTabNavigator, },
    Settings    : { screen: SideMenuScreen, },
  },{
    navigationOptions : ({ navigation }) => ({
      title: `${navigation.state.routeName}`
    }),
    header: Header,
    headerLeft: MenuButton,
  }
);
