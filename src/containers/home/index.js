// React
import React, { Component } from 'react';
import { Image, Dimensions, Platform, View } from 'react-native';

import { doLogOut } from '../../store/actions/auth_actions';

// UI
import {
  Title,
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Drawer,
  Icon,
} from 'native-base';
import SideBar from '../../components/sidebar';
import NewsList from '../../components/newsList';

// constants
import Config, { APPLICATION_RESIDENTIAL_COMPLEX_NAME, MUST_SHOW_LOGO_ON_HOME_PAGE } from '../../core/config';

// Redux
import { connect } from 'react-redux';

// Components and styles
import commonStyles from '../../css/commonStyles';

// Footer Navigations
import FooterNavigation from '../../components/footerNavigation';

class HomeScreen extends Component {
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
        <Header noShadow>
          <Left />
          <Body>
            <Title style={commonStyles.headerTitle}>{this.state.isDrawerOpen ? "Меню" : APPLICATION_RESIDENTIAL_COMPLEX_NAME}</Title>
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
          <NewsList widgetMode={false} navigation={this.props.navigation} />
        </Drawer>
        <FooterNavigation active="Home" navigation={this.props.navigation} />
      </Container>
    );
  }
}

HomeScreen.navigationOptions = {
  title: 'Домашняя страница',
};

export default connect()(HomeScreen);
