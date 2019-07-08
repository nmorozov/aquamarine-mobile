import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  Text,
  Alert,
} from 'react-native';

import _ from 'lodash';

import Request from '../../core/request';

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
  Form,
  Item,
  Input,
} from 'native-base';
import SideBar from '../../components/sidebar';

import VectorIcon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';

import FooterNavigation from '../../components/footerNavigation';

import commonStyles from '..//..//css/commonStyles';
import styles from './styles'

const FOOTER_HEIGHT = 49;
const HEADER_HEIGHT = 56;
const PLATFORM = Platform.OS;

class ChatFormPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
      subject: '',
      text: ','
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

  sendChatMessage = () => {
    const subject = _.get(this.state, 'subject', false);
    const text = _.get(this.state, 'text', false);

    if (!subject) {
      Alert.alert('Ошибка', 'Введите тему сообщения');

      return;
    }

    if (!text) {
      Alert.alert('Ошибка', 'Введите текст сообщения');
    }

    Request.doGetInterlanContent('doCreateChat', { subject: subject, text: text })
    .then((response) => {
      Alert.alert('', 'Сообщение успешно отправленно.');
      this.setState({ subject: '', text: ''});
    })
    .catch((err) => {
      console.log(err);
      Alert.alert('Ошибка', 'Не удалось отправить сообщение. Попробуйте позже.');
    });
  }

  render() {
    const { subject, text } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent style={commonStyles.backArrow} onPress={() => { this.props.navigation.goBack(); }}>
              <VectorIcon style={commonStyles.backArrowIcon} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={commonStyles.headerTitle}>{this.state.isDrawerOpen ? "Меню" : "Написать в УК"}</Title>
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
            <Form style={styles.form}>
              <Item style={styles.formItem}>
                <Input
                  style={styles.subjectInput}
                  onChangeText={text => this.setState({ subject: text })}
                  maxLength={255}
                  placeholder="Введите тему сообщения"
                  value={subject}
                />
              </Item>
              <Item style={styles.formItem}>
                <Input
                  style={styles.textInput}
                  onChangeText={text => this.setState({ text: text })}
                  multiline={true}
                  placeholder="Введите текст сообщения"
                  value={text}
                />
              </Item>
              <Button bordered rounded full primary style={styles.button} onPress={this.sendChatMessage} underlayColor="white">
                <Text>ОТПРАВИТЬ</Text>
              </Button>
            </Form>
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

export default connect(mapStateToProps, actions)(ChatFormPage);
