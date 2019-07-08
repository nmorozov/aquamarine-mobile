// React
import React, { Component } from 'react';

// Icons
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Feather from 'react-native-vector-icons/dist/Feather';

// Styles
import styles from './notificationIconStyle';

class NotificationIcon extends Component {
  getIcon() {
    switch (this.props.iconType) {
      case 'warning':
        return <Ionicons style={styles.warning} name="ios-warning-outline" />;
      case 'user':
        return <Feather style={styles.user} name="user" />;
      case 'barrier-open':
        return <Feather style={styles.barrierOpen} name="minus-circle" />;
      case 'number-added':
        return <Feather style={styles.numberAdded} name="minus-circle" />;
      default:
        break;
    }
  }

  render() {
    return this.getIcon();
  }
}

export default NotificationIcon;
