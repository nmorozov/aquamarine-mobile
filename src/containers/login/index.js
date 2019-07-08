// React
import React, { Component } from 'react';
import {
  Keyboard,
  Alert,
  View,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Animated
} from 'react-native';

//import SplashScreen from 'react-native-splash-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// animation
import Anime from 'react-native-anime';

import { NavigationActions, StackActions } from 'react-navigation';

// UI
import { Form, Item, Input, Button, Text } from 'native-base';
import Spinner from '../../components/uiElements/spinner';

// Redux
import { connect } from 'react-redux';
import { doLogin } from '../../store/actions/auth_actions';

// Components and styles
import styles from './styles';

// images
import logoImage from '../../../assets/Icon/Logo.png';

import Config, { PARAM_ACCESS_TOKEN } from '../../core/config';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      formVisible: false,
      keboardShow: false,
      formOpacity: new Animated.Value(0),
    };

    styles.formWrapper.opacity = 0;
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));

  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    this.setState({ keboardShow: true });
  }

  _keyboardDidHide () {
    this.setState({ keboardShow: false });
  }

  componentDidMount() {
    const { height } = Dimensions.get('window');

    Config.isLogged().then(token => {
      setTimeout(() => {
        if (!token) {
          this.logo.moveY(-150, { duration: 700 }).scale(0.8, { duration: 700 }).start();
          setTimeout(() => {
            const { formOpacity } = this.state;
            Animated.timing(
              formOpacity,
              {
                toValue: 1,
                duration: 700,
              },
            ).start(() => {});
          }, 700);
        } else {
          this.logo.moveY(height / 2 - 40, { duration: 700 }).scale(0.25, { duration: 700 }).start();
          setTimeout(() => {
            this.goToHomepage();
          }, 700);
        }
      }, 1000);
    });
  }

  onLoginPress = () => {
    Keyboard.dismiss();
    if (this.props.isLoginInProces || !this.validate()) {
      return false;
    }
    console.log('Do login');
    this.props.doLogin(this.state.userName, this.state.password, this.successLogin);

    return false;
  }

  successLogin = () => {
    const { height } = Dimensions.get('window');

    const { formOpacity } = this.state;
    Animated.timing(
      formOpacity,
      {
        toValue: 0,
        duration: 500,
      },
    ).start(() => {
      this.logo.stop();
      this.logo.moveY(height / 2 - 40, { duration: 700 }).scale(0.25, { duration: 700 }).start();
      setTimeout(() => {
        this.goToHomepage();
      }, 700);
    });
    this.logo.moveY(150, { duration: 500 }).scale(0.8, { duration: 500 }).start();
  }

  validate() {
    if (this.state.userName.trim() === '') {
      Alert.alert('Ошибка', 'Введите номер договора');

      return false;
    }

    if (this.state.password.trim() === '') {
      Alert.alert('Ошибка', 'Введите пароль');

      return false;
    }

    return true;
  }

  goToHomepage = () => {
    console.log('Go to homepage');
    //this.props.navigation.navigate('Home');
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })]
      //actions: [NavigationActions.navigate({ routeName: 'Gate' })]
    }));
  }
  
  renderLoginPage = () => {
    const { formOpacity } = this.state;
    styles.formWrapper.opacity = formOpacity;

    return (
      <View style={styles.backgroundImage}>
        <View style={this.state.keboardShow && styles.logoHide || styles.logoView}>
          <Anime.View ref={ ref => this.logo = ref }>
            <View>
              <Image source={logoImage} resizeMode="contain" style={styles.mainLogo} ref={ ref => this.logoImg = ref } />
              <Text style={styles.logoText}>МОЙ АКВАМАРИН</Text>
            </View>
          </Anime.View>
        </View>
        <Animated.View style={this.state.keboardShow && styles.formWrapperTop || styles.formWrapper} duration={700}>
          <Text style={styles.instructions}>
            Для входа в приложение введите {'\n'} номер договора и пароль
          </Text>
          <Form style={styles.form}>
            <Text style={styles.loginFieldCaption}>Введите номер договора</Text>
            <Item style={styles.formItem}>
              <Input
                style={styles.loginInput}
                onChangeText={text => this.setState({ userName: text })}
                maxLength={25}
              />
            </Item>
            <Text style={styles.loginFieldCaption}>Введите пароль</Text>
            <Item style={styles.formItem}>
              <Input
                style={styles.loginInput}
                onChangeText={text => this.setState({ password: text })}
                secureTextEntry
                maxLength={25}
              />
            </Item>
            <Button bordered full primary style={styles.loginButton} onPress={this.onLoginPress} underlayColor="black">
              <Text>ВОЙТИ</Text>
            </Button>
          </Form>
        </Animated.View>
      </View>
    );
  }

  render() {
    return this.renderLoginPage();
  }
}

function mapStateToProps(state) {
  return {
    isLoginInProces: state.authorizationReducer.get('isLoginInProces'),
  };
}

const actions = {
  doLogin,
};

export default connect(mapStateToProps, actions)(LoginScreen);
