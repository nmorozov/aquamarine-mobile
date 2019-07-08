// React
import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native';

// UI
import { Text, Container, Header, Left, Right, Body, Icon, Content, Title, Spinner } from 'native-base';

// Redux
import { connect } from 'react-redux';
import { getNotificationDetail } from '../../store/actions/notification_detail_actions';

// Footer Navigations
import FooterNavigation from '../../components/footerNavigation';

// Styles
import commonStyles from '..//..//css/commonStyles';

class DetailNotificationPage extends Component {
  componentWillMount() {
    this.props.getNotificationDetail(this.props.navigation.state.params.notificationId);
  }

  renderDetailNotification = () => {
    if (this.props.isLoading) {
      return <Spinner animating />;
    }

    return <Text>{this.props.notificationDetail.description}</Text>;
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <TouchableHighlight style={commonStyles.backArrow} underlayColor="rgba(0, 0, 0, 0)" onPress={() => { this.props.navigation.goBack(); }}>
              <Icon name="ios-arrow-back" />
            </TouchableHighlight>
          </Left>
          <Body>
            <Title style={commonStyles.headerTitle}>
              {this.props.navigation.state.params.notificationTitle}
            </Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          {this.renderDetailNotification()}
        </Content>
        <FooterNavigation navigation={this.props.navigation} />
      </Container>
    );
  }
}

const actions = {
  getNotificationDetail,
};

function mapStateToProps(state) {
  return {
    notificationDetail: state.notificationDetailReducer.toJS().notificationDetail,
    isLoading: state.notificationDetailReducer.get('isLoading'),
  };
}

export default connect(mapStateToProps, actions)(DetailNotificationPage);
