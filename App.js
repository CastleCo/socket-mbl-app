import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';

// custom theme
import { StyleProvider } from 'native-base';
import getTheme from './src/common/native-base-theme/components';
import theme from './src/common/native-base-theme/variables/castle';

import RootNavigation from './src/navigation/RootNavigation';

// redux + sagas
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import reducer from './src/reducers';
import rootSaga from "./src/sagas"

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

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
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
              <RootNavigation />
            </View>
          </StyleProvider>
        </Provider>
      );
    }
  }

  _loadAssetsAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./src/assets/images/robot-dev.png'),
        require('./src/assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf'),
      }),
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
