import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  Text,
  View,
  Image,
  Alert
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
  Drawer,
  Icon,
} from 'native-base';
import SideBar from '../../components/sidebar';

// Redux
import { connect } from 'react-redux';
import {
  fetchNumbers,
  createNumber,
  updateNumber,
  deleteNumber,
  аddNumberTrigger,
  hideNewNumber
} from '../../store/actions/numbers_actions';

// Footer Navigations
import FooterNavigation from '../../components/footerNavigation';

// Styles
import commonStyles from '../../css/commonStyles';
import styles from './styles';
import ruFlag from '../../../assets/ru.png';

const PLATFORM = Platform.OS;

class Number extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  removeAction = () => {
    Alert.alert(
      'Удаление номера',
      'Вы уверены, что хотите удалить этот номер?',
      [
        {
          text: 'Нет',
          onPress: () => {
          console.log('Cancel Pressed');
        }, style: 'cancel'},
        {
          text: 'Да',
          onPress: () => {
            console.log('OK Pressed')
            this.props.updateData(this.props.number.id);
          }
        },
      ],
      { cancelable: false }
    )
  }

  toEdit = () => {
    this.props.navigation.navigate('NumberGate', { number: { ...this.props.number } });
  }

  render() {
    return (
      <View style={styles.numberContainer}>
        <Button transparent style={styles.number} onPress={this.toEdit}>
          <Text style={styles.chars}>{this.props.number.firstChars}</Text>
          <Text style={styles.digits}>{this.props.number.digits}</Text>
          <Text style={styles.chars}>{this.props.number.secondChars}</Text>
          <View style={styles.region}>
            <Text style={styles.regionDigits}>{this.props.number.regionDigits}</Text>
            <Image source={ruFlag} style={styles.flag} />
          </View>
        </Button>
        <Button
          transparent
          style={styles.deleteNumber}
          onPress={this.removeAction}
        >
          <Icon name={"close"} style={styles.deleteNumberIcon} resizeMode="cover" resizeMethod="resize" />
        </Button>
      </View>
    );
  }
}

// Own const
import {
  FOOTER_HEIGHT,
  HEADER_HEIGHT,
} from './const';

class GatePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
    };
  }

  componentWillMount() {
    this.props.fetchNumbers(0);
  }

  updateData = (id, data) => {
    if (!data) {
      let number = this.props.numbers.find(d => d.id == id);
      return this.props.deleteNumber(number);
    }

    if (!id) {
      this.props.hideNewNumber();
      return this.props.createNumber(data);
    }

    return this.props.updateNumber(data);
  }

  onChangeText(text) {
    this.setState({text});
  }

  closeDrawer = () => {
    this.drawer._root.close();
    this.setState({ isDrawerOpen: false });
    this.props.hideNewNumber();
  }

  openDrawer() {
    this.drawer._root.open();
    this.setState({ isDrawerOpen: true });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title style={commonStyles.headerTitle}>{this.state.isDrawerOpen ? "Меню" : "Ворота"}</Title>
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
            <View style={styles.container}>
              <View style={styles.block}>
                <Text style={styles.titleBlock}>ПОСТОЯННЫЕ</Text>

                {this.props.numbers.filter(n => n.type == 'const').map(num => (
                  <Number key={num.id} number={num} updateData={this.updateData} navigation={this.props.navigation} />
                ))}

                <Text style={styles.comment}>{/*Вы можете добавить до двух постоянных номеров*/}</Text>
              </View>

              <View style={styles.block}>
                <Text style={styles.titleBlock}>ВРЕМЕННЫЕ</Text>

                {this.props.numbers.filter(n => n.type == 'temp').map(num => (
                  <Number key={num.id} number={num} updateData={this.updateData} navigation={this.props.navigation} />
                ))}

                <Text style={styles.comment}>Временный номер получает доступ на территорию на 1 сутки</Text>
              </View>
            </View>
          </Content>
        </Drawer>
        <FooterNavigation active="Gate" navigation={this.props.navigation} />
      </Container>
    );
  }
}

const actions = {
  fetchNumbers,
  createNumber,
  updateNumber,
  deleteNumber,
  аddNumberTrigger,
  hideNewNumber
};

function mapStateToProps(state) {
  return {
    addNumber: state.numbers.get('addNumber'),
    numbers: state.numbers.get('numbers'),
  };
}

export default connect(mapStateToProps, actions)(GatePage);
