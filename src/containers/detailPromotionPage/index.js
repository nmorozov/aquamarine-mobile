// React
import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Platform,
  Dimensions
} from 'react-native';

// UI
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Content,
  Title,
  Button,
  Icon,
  Drawer,
} from 'native-base';
import SideBar from '../../components/sidebar';
import Spinner from '../../components/uiElements/spinner';
import VectorIcon from 'react-native-vector-icons/Ionicons';

import HTMLView from 'react-native-htmlview';

// Redux
import { connect } from 'react-redux';
import { getPromotionDetail } from '../../store/actions/promotion_detail_actions';

// Footer Navigations
import FooterNavigation from '../../components/footerNavigation';

// Styles
import styles from './styles';
import commonStyles from '../../css/commonStyles';

import pix from '../../../assets/pix.png';

import { formatDate } from '../../core/utils';

const FOOTER_HEIGHT = 49;
const HEADER_HEIGHT = 56;
const PLATFORM = Platform.OS;

class DetailPromotionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
    };
  }

  closeDrawer() {
    this.drawer._root.close();
    this.setState({ isDrawerOpen: false });
  }
  openDrawer() {
    this.drawer._root.open();
    this.setState({ isDrawerOpen: true });
  }

  componentWillMount() {
    this.props.getPromotionDetail(this.props.navigation.state.params.promotionId);
  }

  renderDetailPromotion = () => {
    if (this.props.isLoading) {
      return <Spinner animating />;
    }
    const htmlText = this.props.promotionDetail.text.replace(/(\r\n|\n|\r)/gm, '');

    return <HTMLView style={styles.htmlView} stylesheet={styles.htmlContent} value={htmlText} />;
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button style={commonStyles.backArrow} transparent onPress={() => { this.props.navigation.goBack(); }}>
              <VectorIcon style={commonStyles.backArrowIcon} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={commonStyles.headerTitle}>{this.state.isDrawerOpen ? "Меню" : "Акции"}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={(this.state.isDrawerOpen ? this.closeDrawer : this.openDrawer).bind(this)}
            >
              <Icon name={this.state.isDrawerOpen ? "close" : "menu"}  />
            </Button>
          </Right>
        </Header>
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar close={() => this.closeDrawer()} navigation={this.props.navigation} />}
          onClose={() => this.closeDrawer()}
          openDrawerOffset={0}
          styles={{}}
          side="right"
        >
          <View style={styles.imageTitleContainer}>
            <ImageBackground source={this.props.promotionDetail.image ? { uri: this.props.promotionDetail.image } : pix } style={styles.promotionBackgroundImage} resizeMode="cover">
              <View style={styles.overlay} />
              <Text style={styles.promotionsDate}>{formatDate(this.props.promotionDetail.date, 'ddmmyyyy')}</Text>
              <Text style={styles.promotionsTitle}>{this.props.promotionDetail.title}</Text>
            </ImageBackground>
          </View>
          <Content padder
            height={(PLATFORM === 'ios' ? Dimensions.get('window').height - 150 : Dimensions.get('window').height) - FOOTER_HEIGHT - HEADER_HEIGHT}
            style={{marginBottom: 49}}
          >
            {this.renderDetailPromotion()}
          </Content>
        </Drawer>
        <FooterNavigation navigation={this.props.navigation} />
      </Container>
    );
  }
}

const actions = {
  getPromotionDetail,
};

function mapStateToProps(state) {
  return {
    promotionDetail: state.promotionDetailReducer.toJS().promotionDetail,
    isLoading: state.promotionDetailReducer.get('isLoading'),
  };
}

export default connect(mapStateToProps, actions)(DetailPromotionPage);
