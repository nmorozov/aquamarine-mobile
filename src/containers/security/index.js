// React
import React, { Component } from 'react';

// UI
import { Header, Left, Body, Title, Right, Container, Content } from 'native-base';

// Redux
import { connect } from 'react-redux';

// Styles
import commonStyles from '..//..//css/commonStyles';

// Footer Navigations
import FooterNavigation from '../../components/footerNavigation';

class SecurityScreen extends Component {
  render() {
    return (
      <Container>
        <Header noShadow>
          <Left />
          <Body>
            <Title style={commonStyles.headerTitle}>Московское Ш., 108</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
        </Content>
        <FooterNavigation navigation={this.props.navigation} activeSection={this.props.activeSection}/>
      </Container>
    );
  }
}

SecurityScreen.navigationOptions = {
  header: null,
};

export default connect()(SecurityScreen);
