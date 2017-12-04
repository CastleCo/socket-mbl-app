import React from 'react';
import { StackNavigator } from 'react-navigation';
import { LoginScreen, RegisterScreen, ForgotPasswordScreen } from '../Auth/screens';

export default StackNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  ForgotPassword: { screen: ForgotPasswordScreen },
}, {
  headerMode: 'none'  
});
