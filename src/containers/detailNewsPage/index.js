import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Platform,
  Dimensions
} from 'react-native';

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

import { connect } from 'react-redux';
import { getNewsDetail } from '../../store/actions/news_detail_actions';

import FooterNavigation from '../../components/footerNavigation';

import styles from './styles';
import commonStyles from '..//..//css/commonStyles';

import { formatDate } from '../../core/utils';

import pix from '../../../assets/pix.png';

const FOOTER_HEIGHT = 49;
const HEADER_HEIGHT = 56;
const PLATFORM = Platform.OS;

class DetailNewsPage extends Component {
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
    this.props.getNewsDetail(this.props.navigation.state.params.newsId);
  }

  renderDetailNews = () => {
    if (this.props.isLoading) {
      return <Spinner animating />;
    }

    const htmlText = this.props.newsDetail.text.replace(/(\r\n|\n|\r)/gm, '');

    return <HTMLView style={styles.htmlView} stylesheet={styles.htmlContent} value={htmlText} />;
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent style={commonStyles.backArrow} onPress={() => { this.props.navigation.goBack(); }}>
              <VectorIcon style={commonStyles.backArrowIcon} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={commonStyles.headerTitle}>{this.state.isDrawerOpen ? "Меню" : "Новости"}</Title>
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
            <ImageBackground source={this.props.newsDetail.image ? { uri: this.props.newsDetail.image } : pix } style={styles.newsBackgroundImage} resizeMode="cover">
              <View style={styles.overlay} />
            </ImageBackground>
          </View>
          <Content padder
            height={(PLATFORM === 'ios' ? Dimensions.get('window').height - 150 : Dimensions.get('window').height) - FOOTER_HEIGHT - HEADER_HEIGHT}
            style={{marginBottom: 49}}
          >
            <Text style={styles.newsDate}>{formatDate(this.props.newsDetail.date, 'ddmmyyyy')}</Text>
            <Text style={styles.newsTitle}>{this.props.newsDetail.title}</Text>
            {this.renderDetailNews()}
          </Content>
        </Drawer>
        <FooterNavigation navigation={this.props.navigation} />
      </Container>
    );
  }
}

const actions = {
  getNewsDetail,
};

function mapStateToProps(state) {
  return {
    newsDetail: state.newsDetailReducer.toJS().newsDetail,
    isLoading: state.newsDetailReducer.get('isLoading'),
  };
}

export default connect(mapStateToProps, actions)(DetailNewsPage);
