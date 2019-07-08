import React, {Component} from 'react';
import {Platform, StyleSheet, StatusBar, View} from 'react-native';
import { Provider } from 'react-redux';
import { StyleProvider } from 'native-base';

import SplashScreen from 'react-native-splash-screen';

import SmartHome from './src/navigators/AppNavigator';

import store from './src/store';
import getTheme from './smart-home-theme/components';
import material from './smart-home-theme/variables/material';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //setTimeout(() => SplashScreen.hide(), 3000);
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(material)}>
          <View style={styles.main}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBar} />}
            <SmartHome />
          </View>
        </StyleProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
