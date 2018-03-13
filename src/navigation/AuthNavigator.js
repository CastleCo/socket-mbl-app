import React from 'react';
import { StackNavigator } from 'react-navigation';
import { LoginScreen, RegisterScreen, ForgotPasswordScreen } from '../Auth/screens';

export default StackNavigator({
  Register: { screen: RegisterScreen },
  Login: { screen: LoginScreen },
  ForgotPassword: { screen: ForgotPasswordScreen },
}, {
    headerMode: 'none',
    initialRouteName: 'Register'  
});
