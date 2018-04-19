import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';

// configure shoutem to intercept fetches, insert token and retry 401'd reqs
import { configure } from '@shoutem/fetch-token-intercept';
import fetchConfiguration from './fetch-configuration';
configure(fetchConfiguration);

// redux integration
import { Provider } from "react-redux";
import store from "./store";

// custom theme
import { StyleProvider, Root } from 'native-base';
import getTheme from './src/common/native-base-theme/components';
import theme from './src/common/native-base-theme/variables/castle';

import RootScreen from './src/navigation';

export default class App extends React.Component {
  state = { isLoadingComplete: false };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return <AppLoading
        startAsync={this._loadAssetsAsync}  
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
      />;
    } else {
      return (
        <Provider store={store}>
          <StyleProvider style={getTheme(theme)}>
            <Root style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" animated={true} />}
              {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
              <RootScreen />
            </Root>
          </StyleProvider>
        </Provider>
      );
    }
  }

  _loadAssetsAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./src/assets/icons/app-icon.png'),
        require('./src/assets/images/robot-dev.png'),
        require('./src/assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font
      })
    ]);
  }
  _handleFinishLoading = () => { this.setState({ isLoadingComplete: true }); }
  _handleLoadingError = (e) => { console.warn(e); }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
