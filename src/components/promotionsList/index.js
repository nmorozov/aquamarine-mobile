// React
import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, TouchableWithoutFeedback } from 'react-native';

// Redux
import { connect } from 'react-redux';
import { fetchPromotions } from '../../store/actions/promotions_actions';

// UI
import { Container, Text } from 'native-base';
import SmallButton from '../uiElements/smallButton';

import Spinner from '../../components/uiElements/spinner';

// Styles
import styles from './styles';

// core
import { formatDate } from '../../core/utils';

import pix from '../../../assets/pix.png';

class PromoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        'sort[date]': '-1',
      },
    };
  }

  componentWillMount() {
    this.loadPromotions(0, this.state.pagination);
  }

  onPageScroll = (e) => {
    if (this.isCloseToBottom(e.nativeEvent)) {
      if (!this.props.isLoadingFinished) {
        this.loadPromotions(this.props.loadFrom);
      }
    }
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  loadPromotions = (from, params = {}) => {
    if (!this.props.isLoading) {
      const currentParams = {
        ...this.state.pagination,
        ...params,
      };

      this.props.fetchPromotions(from, currentParams);
    }
  }

  goToDetailPromotionPage = (promotionId, promotionTitle, promotionText) => {
    this.props.navigation.navigate('DetailPromotionPage', { promotionId, promotionTitle, promotionText });
  }

  renderPromotionItems = promotions => {
    return promotions.map(promotion => (
    <TouchableWithoutFeedback
      key={promotion.id}
      onPress={() => {
        this.goToDetailPromotionPage(
          promotion.id,
          promotion.name,
          promotion.description,
        );
      }}
    >
      <View key={promotion.id} style={styles.promotionsItem}>
        <ImageBackground source={promotion.image ? { uri: promotion.image } : pix } style={styles.promotionBackgroundImage} resizeMode="cover">
          <View style={styles.overlay} />
          <Text style={styles.promotionsDate}>{formatDate(promotion.date, 'ddmmyyyy')}</Text>
          <Text style={styles.promotionsTitle}>{promotion.title}</Text>
          <SmallButton
            style={styles.detailPromotionButton}
            direction="right"
            onPress={() => {
              this.goToDetailPromotionPage(
                promotion.id,
                promotion.name,
                promotion.description,
              );
            }}
          />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  ));}

  renderPromotions = () => {
    if (this.props.promotions.length > 0) {
      const promotions = Object.keys(this.props.promotions).map(k => this.props.promotions[k]);

      return (
        <ScrollView style={styles.promotionsScrollContainer} onScroll={this.onPageScroll}>
          {this.renderPromotionItems(promotions)}
        </ScrollView>);
    }

    return (
      <View>
        {!this.props.isLoading && 
        <Text style={styles.promotionsNotFound}>Акций нет</Text>}
        {this.props.isLoading &&
          <Spinner animating />
        }
      </View>
    );
  }

  render() {
    return (
      <Container style={styles.content}>
        {this.renderPromotions()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    promotions: state.promotionsReducer.toJS().promotions,
    loadFrom: state.promotionsReducer.get('loadFrom'),
    isLoading: state.promotionsReducer.get('isLoading'),
    isLoadingFinished: state.promotionsReducer.get('isLoadingFinished'),
  };
}

const actions = {
  fetchPromotions,
};

export default connect(mapStateToProps, actions)(PromoList);
