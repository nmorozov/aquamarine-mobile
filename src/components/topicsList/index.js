// React
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';

// lodash
import _ from 'lodash';

// Redux
import { connect } from 'react-redux';

// UI
import { Container, Text } from 'native-base';
import SmallButton from '../uiElements/smallButton';

// Styles
import styles from './styles';

import Spinner from '../uiElements/spinner';

// core
import { formatDate } from '../../core/utils';

class TopicsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        'sort[date]': '-1',
      },
    };
  }

  componentWillMount() {
  }

  onPageScroll = (e) => {
  }

  goToDetail = (topic) => {
    this.props.navigation.navigate('ChatInner', { topic });
  }

  renderTopicsItems = topics => topics.map(topic => (
    <TouchableWithoutFeedback
      key={topic.id}
      onPress={() => {
        this.goToDetail(topic);
      }}
    >
      <View key={topic.id} style={styles.topicItem}>
        <View style={styles.topicContainer} >
          <Text style={styles.topicDate}>{formatDate(topic.date, 'ddmmyyyy')}</Text>
          <Text style={styles.topicText}>{topic.title}</Text>
          <SmallButton
            style={styles.detailTopicButton}
            direction="right"
            onPress={() => {
              this.goToDetail(topic);
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  ))

  renderTopics = () => {
    if (this.props.topics.length > 0) {
      const topics = _.toArray(this.props.topics);

      return (
        <ScrollView style={styles.topicsScrollContainer} onScroll={this.onPageScroll}>
          {this.renderTopicsItems(topics)}
        </ScrollView>);
    }

    return (
      <View>
        {!this.props.isLoading}
        {this.props.isLoading &&
          <Spinner animating />
        }
      </View>
    );
  }

  render() {
    return (
      <Container style={styles.content}>
        {this.renderTopics()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
      topics: [],
  };
}

const actions = {
};

export default connect(mapStateToProps, actions)(TopicsList);
