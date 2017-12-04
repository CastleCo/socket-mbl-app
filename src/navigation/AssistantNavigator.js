import React from 'react';
import { StackNavigator } from 'react-navigation';
import { AssistantScreen } from '../Assistant/screens';

export default StackNavigator({
  Assistant: { screen: AssistantScreen },
}, {
  initialRouteName: 'Assistant'
});