// React
import React, { Component } from 'react';
import { View, ScrollView, TouchableHighlight } from 'react-native';

// lodash
import _ from 'lodash';

// Redux
import { connect } from 'react-redux';
import { fetchNotifications } from '../../store/actions/notification_actions';

// UI
import { Container, Text, Spinner } from 'native-base';

// Styles
import styles from './styles';

// Icons
import NotificationIcons from './notificationIcon';

import { formatDate } from '../../core/utils';


class NotificationsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        'sort[date]': '-1',
      },
    };
  }

  componentWillMount() {
    this.loadNotifications(0, this.state.pagination);
  }

  onPageScroll = (e) => {
    if (this.isCloseToBottom(e.nativeEvent)) {
      if (!this.props.isLoadingFinished) {
        this.loadNotifications(this.props.loadFrom);
      }
    }
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  groupNotificationsByDate = ungroupedNotifications =>
    (
      this.props.notifications.length < 1 ? 
        [] :
        _.groupBy(ungroupedNotifications, i => formatDate(i.date, 'ddmmyyyyWithoutdashes'))
    );

  loadNotifications = (from, params = {}) => {
    if (!this.props.isLoading) {
      const currentParams = {
        ...this.state.pagination,
        ...params,
      };

      this.props.fetchNotifications(from, currentParams);
    }
  }

  goToDetailNotificationPage = (notificationId, notificationTitle, notificationText) => {
    console.log('TouchDetails', notificationId, notificationTitle, notificationText);
    this.props.navigation.navigate('DetailNotificationPage', { notificationId, notificationTitle, notificationText });
  }

    renderNotificationContainers = notifications => {
      console.log(renderNotificationContainers, notifications);
      return _.map(notifications, (groupNotificationInfo, index) => (
        <View key={index}>
          <Text style={styles.groupTitle}>{formatDate(groupNotificationInfo[0].date, 'dayMonthNameYear')}</Text>
          <View>{this.renderNotificationItems(groupNotificationInfo)}</View>
        </View>
      ));}

    renderNotificationItems = notifications => {
      console.log('render notifications', notifications);
      return notifications.map(notification => (
      <TouchableHighlight
        onPress={() => {
          this.goToDetailNotificationPage(
            notification.id,
            notification.name,
            notification.description,
          );
        }}
        key={notification.id}
        underlayColor="rgba(0, 0, 0, 0)"
      >
        <View key={notification.id} style={styles.notificationsItem}>
          <NotificationIcons iconType="warning" />
          <Text style={styles.notificationsTitle}>{notification.name}</Text>
          <Text style={styles.notificationsDate}>{formatDate(notification.date, 'timeddmmyyyy')}</Text>
        </View>
      </TouchableHighlight>
    ));}

    renderNotifications = () => {
      if (this.props.notifications.length > 0) {
        const notifications = _.toArray(this.groupNotificationsByDate(this.props.notifications))
          .sort()
          .reverse();
        let latestNotifications;

        if (this.props.widgetMode) {
          latestNotifications = notifications.slice(0, 1);
          latestNotifications[0] = notifications[0].slice(0, 10);
        }

        return this.props.widgetMode ?
          this.renderNotificationContainers(latestNotifications) :
          <ScrollView onScroll={this.onPageScroll}>
            {this.renderNotificationContainers(notifications)}
          </ScrollView>;
      }

      return (
        <View>
          {!this.props.isLoading && 
          <Text style={styles.notificationsNotFound}>Оповещений нет</Text>}
          {this.props.isLoading &&
            <Spinner animating />
          }
        </View>
      );
    }

    render() {
      return (
        <Container style={styles.content}>
          {this.renderNotifications()}
        </Container>
      );
    }
}

function mapStateToProps(state) {
  return {
    notifications: state.notificationsReducer.toJS().notifications,
    loadFrom: state.notificationsReducer.get('loadFrom'),
    isLoading: state.notificationsReducer.get('isLoading'),
    isLoadingFinished: state.notificationsReducer.get('isLoadingFinished'),
  };
}

const actions = {
  fetchNotifications,
};

export default connect(mapStateToProps, actions)(NotificationsList);
