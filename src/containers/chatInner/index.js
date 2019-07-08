// React
import React, { Component } from 'react';
import {
  TouchableHighlight,
  Platform,
  Dimensions,
  Text,
  View,
} from 'react-native';

import HTMLView from 'react-native-htmlview';

import Svg, {
    Path
} from 'react-native-svg';

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
  Drawer,
  Icon,
} from 'native-base';
import SideBar from '../../components/sidebar';

import VectorIcon from 'react-native-vector-icons/Ionicons';

// Redux
import { connect } from 'react-redux';

// Footer Navigations
import FooterNavigation from '../../components/footerNavigation';

// Styles
import commonStyles from '..//..//css/commonStyles';
import styles from './styles'

const FOOTER_HEIGHT = 49;
const HEADER_HEIGHT = 56;
const PLATFORM = Platform.OS;

class ChatInnerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false
    }
  }

  closeDrawer() {
    this.drawer._root.close();
    this.setState({ isDrawerOpen: false });
  }
  openDrawer() {
    this.drawer._root.open();
    this.setState({ isDrawerOpen: true });
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
            <Title style={commonStyles.headerTitle}>{this.state.isDrawerOpen ? "Меню" : "Диалог"}</Title>
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
          <Content padder
            height={(PLATFORM === 'ios' ? Dimensions.get('window').height - 150 : Dimensions.get('window').height) - FOOTER_HEIGHT - HEADER_HEIGHT}
            style={{marginBottom: 49}}
          >
            <Text />
          </Content>
        </Drawer>
        <FooterNavigation navigation={this.props.navigation} />
      </Container>
    );
  }
}

const actions = {
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, actions)(ChatInnerPage);
