// React
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Alert
} from 'react-native';

// UI
import {
  Button,
  Icon,
} from 'native-base';

// Styles
import styles from '../styles'
import ruFlag from '../../../../assets/ru.png';

class Numbers extends Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  removeAction(type, index) {
    Alert.alert(
      'Удаление номера',
      'Вы уверены, что хотите удалить этот номер?',
      [
        {
          text: 'Нет',
          onPress: () => {
          console.log('Cancel Pressed');
        }, style: 'cancel'},
        {
          text: 'Да',
          onPress: () => {
            console.log('OK Pressed')
            this.props.updateData(type, index);
          }
        },
      ],
      { cancelable: false }
    )
  }

  render() {
    return this.props.data.map((num, index) => {
      return (
        <View key={index} style={styles.numberContainer}>
          <Button transparent style={styles.number}>
            <Text style={styles.chars}>{num.firstChars}</Text>
            <Text style={styles.digits}>{num.digits}</Text>
            <Text style={styles.chars}>{num.secondChars}</Text>
            <View style={styles.region}>
              <Text style={styles.regionDigits}>{num.regionDigits}</Text>
              <Image source={ruFlag} style={styles.flag} />
            </View>
          </Button>
          <Button
            key={index}
            data-key={index}
            transparent
            style={styles.deleteNumber}
            onPress={() => this.removeAction(this.props.type, index)}
          >
            <Icon name={"close"} style={styles.deleteNumberIcon} resizeMode="cover" resizeMethod="resize" />
          </Button>
        </View>
      );
    });
  }
}

export default Numbers;