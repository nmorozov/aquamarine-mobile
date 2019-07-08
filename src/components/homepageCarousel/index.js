// React
import React, { Component } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';

// UI
import Carousel from 'react-native-carousel-view';

// Widgets
import NewsList from '../../components/newsList';
import PromotionsList from '../../components/promotionsList';

// styles
import styles from './styles';

import { FOOTER_HEIGHT } from '../footerNavigation/styles.js';
export const HEADER_HEIGHT = 56 + 57;

// constants
const PROMOTIONS_SLIDE = 0;
const NEWS_SLIDE = 1;
const PLATFORM = Platform.OS;

class HomepageCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
    };
  }
    getSlideStyle = slideNumber => (
      this.state.activeSlide === slideNumber ? styles.activeSlideTitle : styles.inactiveSlideTitle
    );

    GoToSlide = (slideNumber) => {
      this.carousel.setState({ activePage: slideNumber });
      this.carousel.pager.scrollToPage(slideNumber);
      this.setState({ activeSlide: slideNumber });
    }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.slideTitlesContainer}>
            <View style={styles.slideTitle}>
              <Text
                onPress={() => { this.GoToSlide(PROMOTIONS_SLIDE); }}
                style={this.getSlideStyle(PROMOTIONS_SLIDE)}
              >
                АКЦИИ
              </Text>
            </View>
            <View style={styles.slideTitle}>
              <Text
                onPress={() => { this.GoToSlide(NEWS_SLIDE); }}
                style={this.getSlideStyle(NEWS_SLIDE)}
              >
                НОВОСТИ
              </Text>
            </View>
          </View>
          <Carousel
            height={(PLATFORM === 'ios' ? Dimensions.get('window').height - 37.5 : Dimensions.get('window').height - 37.5) - FOOTER_HEIGHT - HEADER_HEIGHT}
            hideIndicators
            indicatorAtBottom={false}
            indicatorSize={5}
            indicatorSpace={10}
            indicatorOffset={40}
            indicatorColor="#AAAAAA"
            inactiveIndicatorColor="#E1E1E1"
            animate={false}
            onPageChange={(slideNumber) => { this.setState({ activeSlide: slideNumber }); }}
            ref={ref => this.carousel = ref}
          >
            <View style={styles.element}>
              <PromotionsList navigation={this.props.navigation} />
            </View>
            <View style={styles.element}>
              <NewsList widgetMode={false} navigation={this.props.navigation} />
            </View>
          </Carousel>
        </View>
      );
    }
}

export default HomepageCarousel;
