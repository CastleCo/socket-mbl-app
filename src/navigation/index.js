import React from 'react';
import { connect } from "react-redux";
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import { Notifications } from 'expo';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import { addListener } from "../modules/navigation";
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

export const RootNavigator = SwitchNavigator({
  Auth: { screen: AuthNavigator, },
  App: { screen: AppNavigator }
}, {
  headerMode: 'none',
  initialRouteName: 'Auth'
});

class RootScreen extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootNavigator navigation={{
      dispatch: this.props.dispatch,
      state: this.props.navigation,
      addListener
    }} />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}

const mapStateToProps = state => ({ navigation: state.navigation });

export default connect(mapStateToProps)(RootScreen);