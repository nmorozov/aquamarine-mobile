// React
import React, { Component } from 'react';
import { Alert } from 'react-native';

// UI
import {
  Screen,
  Text,
  TextInput,
  Button,
  Title,
} from 'native-base';

// Redux
import { connect } from 'react-redux';

// Components and styles
import styles from './styles';

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneFormatted: '',
      phoneExtracted: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };
  }

  onRegistrationPress() {
    if (!this.validate()) {
      return false;
    }

    return true;
  }

  validate() {
    if (this.state.phoneExtracted.trim() === '') {
      Alert.alert('Ошибка', 'Введите номер телефона');

      return false;
    }

    if (this.state.email.trim() === '') {
      Alert.alert('Ошибка', 'Введите email');

      return false;
    }

    if (this.state.password.trim() === '') {
      Alert.alert('Ошибка', 'Введите пароль');

      return false;
    }

    if (this.state.passwordConfirmation.trim() === '') {
      Alert.alert('Ошибка', 'Введите подтверждение пароля');

      return false;
    }

    return true;
  }

  renderRegistrationform() {
    return (
      <Screen styleName="vertical full-screen" style={styles.container} >
        <Title styleName="md-gutter-bottom">Регистрация</Title>
        <TextInput
          styleName="stretch"
          refInput={(ref) => { this.input = ref; }}
          style={styles.input}
          placeholder="Телефон"
          onChangeText={(formatted, extracted) => {
                this.setState({ phoneFormatted: formatted });
                this.setState({ phoneExtracted: extracted });
          }}
          mask="+7 ([000]) [000] [00] [00]"
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => this.setState({ email: text })}
          styleName="stretch"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          onChangeText={text => this.setState({ password: text })}
          styleName="stretch"
        />
        <TextInput
          style={styles.input}
          placeholder="Подтверждение пароля"
          onChangeText={text => this.setState({ passwordConfirmation: text })}
          styleName="stretch"
        />
        <Button onPress={this.onRegistrationPress} style={styles.registrationButton}>
          <Text styleName="stretch">Отправить</Text>
        </Button>
      </Screen>
    );
  }

  render() {
    return this.renderRegistrationform();
  }
}

RegistrationScreen.navigationOptions = {
  title: 'Log In',
  header: null,
};

export default connect()(RegistrationScreen);
