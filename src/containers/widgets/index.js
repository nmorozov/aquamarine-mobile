// React
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

// Prop Types
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { doLogOut } from '../../store/actions/auth_actions';

// Components and styles
import styles from './styles';

class HomeScreen extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onBackPress = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Виджеты</Text>
        <Button onPress={this.onBackPress} title="Назад" />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  title: 'Виджеты',
};

export default connect()(HomeScreen);
