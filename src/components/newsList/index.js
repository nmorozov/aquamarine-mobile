import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import { fetchNews } from '../../store/actions/news_actions';

import { Container, Text } from 'native-base';
import SmallButton from '../uiElements/smallButton';

import styles from './styles';

import Spinner from '../uiElements/spinner';

import { formatDate } from '../../core/utils';

class NewsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        'sort[date]': '-1',
      },
    };
  }

  componentWillMount() {
    this.loadNews(0, this.state.pagination);
  }

  onPageScroll = (e) => {
    if (this.isCloseToBottom(e.nativeEvent)) {
      if (!this.props.isLoadingFinished) {
        this.loadNews(this.props.loadFrom);
      }
    }
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  loadNews = (from, params = {}) => {
    if (!this.props.isLoading) {
      const currentParams = {
        ...this.state.pagination,
        ...params,
      };

      this.props.fetchNews(from, currentParams);
    }
  }

  goToDetailNewsPage = (newsId, newsTitle, newsText) => {
    this.props.navigation.navigate('DetailNewsPage', { newsId, newsTitle, newsText });
  }

  renderNewsItems = news => news.map(newsData => (
    <TouchableWithoutFeedback
      key={newsData.id}
      onPress={() => {
        this.goToDetailNewsPage(
          newsData.id,
          newsData.name,
          newsData.description,
        );
      }}
    >
      <View key={newsData.id} style={styles.newsItem}>
      <ImageBackground source={newsData.image ? { uri: newsData.image } : pix } style={styles.newsBackgroundImage} resizeMode="cover">
        <View style={styles.newsContainer} >
          <View style={styles.overlay} />
          <Text style={styles.newsDate}>{formatDate(newsData.date, 'ddmmyyyy')}</Text>
          <Text style={styles.newsText}>{newsData.title}</Text>
        </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  ))

  renderNews = () => {
    if (this.props.news.length > 0) {
      const news = Object.keys(this.props.news).map(k => this.props.news[k]);

      return (
        <ScrollView style={styles.newsScrollContainer} onScroll={this.onPageScroll}>
          {this.renderNewsItems(news)}
        </ScrollView>);
    }

    return (
      <View>
        {!this.props.isLoading && 
        <Text style={styles.newsNotFound}>Новостей нет</Text>}
        {this.props.isLoading &&
          <Spinner animating />
        }
      </View>
    );
  }

  render() {
    return (
      <Container style={styles.content}>
        {this.renderNews()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    news: state.newsReducer.toJS().news,
    loadFrom: state.newsReducer.get('loadFrom'),
    isLoading: state.newsReducer.get('isLoading'),
    isLoadingFinished: state.newsReducer.get('isLoadingFinished'),
  };
}

const actions = {
  fetchNews,
};

export default connect(mapStateToProps, actions)(NewsList);
