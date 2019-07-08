// React
import React, { Component } from 'react';
import {
  TextInput,
  Platform,
  Dimensions,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  Animated
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

import VectorIcon from 'react-native-vector-icons/Ionicons';
import { StackActions } from 'react-navigation';

// Redux
import { connect } from 'react-redux';
import {
  fetchNumbers,
  createNumber,
  updateNumber,
} from '../../store/actions/numbers_actions';

// Footer Navigations
import FooterNavigation from '../../components/footerNavigation';

import GateTopPanel from '../../components/gateTopPanel';

// Styles
import commonStyles from '../../css/commonStyles';
import styles from './styles';
import ruFlag from '../../../assets/ru.png';

const PLATFORM = Platform.OS;

const ALLOW_CHARS = {
    'A': 'A', 'B': 'B', 'C': 'C', 'E': 'E', 'H': 'H', 'K': 'K', 'M': 'M', 'O': 'O', 'P': 'P', 'T': 'T', 'X': 'X', 'Y': 'Y',
    'А': 'A', 'В': 'B', 'С': 'C', 'Е': 'E', 'Н': 'H', 'К': 'K', 'М': 'M', 'О': 'O', 'Р': 'P', 'Т': 'T', 'Х': 'X', 'У': 'Y'
};

// Own const
export const FOOTER_HEIGHT = 49;
export const HEADER_HEIGHT = 56;

class Number extends Component {
  constructor(props) {
    super(props);
    let { number = {} } = this.props;
    this.state = {
      id: number.id || undefined,
      firstChars: number.firstChars || '',
      digits: number.digits || '',
      secondChars: number.secondChars || '',
      regionDigits: number.regionDigits || '',
    };
    console.log(this.state, number);
    this.fields = [ 'firstChars', 'digits', 'secondChars', 'regionDigits' ];
  }

  onKeyPress = (name, e) => {
    if (e.nativeEvent.key != 'Backspace') return;
    setTimeout(() => {
      if (this.state[name].length) return;
      let index = this.fields.indexOf(name);
      if (!index) return;
      let field = this.fields[index-1];
      field && this[field].focus();
    }, 10);

    this.props.onChange && this.props.onChange(this.state);
  }

  changeChars = (name, length, chars) => {
    chars = chars.toUpperCase();

    for ( let i = 0; i < chars.length; i++)
      if (!~Object.keys(ALLOW_CHARS).indexOf(chars[i])) return;
      else chars[i] = ALLOW_CHARS[chars[i]];

    this.setState({ [name]: chars }, () => {
      this.props.onChange && this.props.onChange(this.state);
    });

    if (chars.length == length) {
      let index = this.fields.indexOf(name);
      let field = this.fields[index+1];
      field && this[field].focus();
    }
  }

  changeDigits = (name, length, digits) => {
    for ( let i = 0; i < digits.length; i++)
      if (digits[i] != parseInt(digits[i])) return;

    this.setState({ [name]: digits }, () => {
      this.props.onChange && this.props.onChange(this.state);
    });

    if (digits.length == length) {
      let index = this.fields.indexOf(name);
      let field = this.fields[index+1];
      field && this[field].focus();
    }
  }

  render() {
    return (
      <View style={styles.numberContainer}>
        <View style={styles.number}>
          <TextInput
            ref={r => {this.firstChars = r}}
            style={Object.assign({ width: 24 }, styles.chars, styles.editNumber)}
            onChangeText={this.changeChars.bind(this, 'firstChars', 1)}
            onKeyPress={this.onKeyPress.bind(this, 'firstChars')}
            value={this.state.firstChars}
            autoFocus={!this.state.id}
            placeholder='A'
            maxLength={1}/>
          <TextInput
            ref={r => {this.digits = r}}
            style={Object.assign({width: 52 }, styles.digits, styles.editNumber)}
            keyboardType='numeric'
            onChangeText={this.changeDigits.bind(this, 'digits', 3)}
            onKeyPress={this.onKeyPress.bind(this, 'digits')}
            value={this.state.digits}
            placeholder='123'
            maxLength={3}/>
          <TextInput
            ref={r => {this.secondChars = r}}
            style={Object.assign({ width: 40 }, styles.chars, styles.editNumber)}
            onChangeText={this.changeChars.bind(this, 'secondChars', 2)}
            onKeyPress={this.onKeyPress.bind(this, 'secondChars')}
            value={this.state.secondChars}
            placeholder='AA'
            maxLength={2}/>
          <View style={styles.region}>
            <TextInput
              ref={r => {this.regionDigits = r}}
              style={Object.assign({width: 30 }, styles.regionDigits, styles.editNumber, { height: 26 })}
              keyboardType='numeric'
              onChangeText={this.changeDigits.bind(this, 'regionDigits', 3)}
              onKeyPress={this.onKeyPress.bind(this, 'regionDigits')}
              value={this.state.regionDigits}
              placeholder='99'
              maxLength={3}/>
            <Image source={ruFlag} style={styles.flag} />
          </View>
        </View>
      </View>
    );
  }
}

let xOffset = new Animated.Value(-500);

class TypeNumber extends Component {
  constructor(props) {
    super(props);
console.log('----', this.props.value);
    this.state = {
      xOffset: xOffset,
      index: this.props.value || 0,
    };
  }

  componentDidMount() {
    console.log(this.state.index, this.props);
    setTimeout(() => {
      this.setIndex(this.props.value, false);
    }, 100);
  }

  setIndex = (index, animated = true) => {
    console.log('SET INDEX', index);
    let w = (Dimensions.get('window').width - 60);
    this.setState({ index });
    this.refs.scrollView.scrollTo({
      x: (w - (index * w)) || 1,
      y: 0,
      animated
    });

    (index != this.state.index) && this.props.onChange && this.props.onChange(index);
  }

  onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: xOffset } } }]);

  onScrollStart = () => {
    console.log('Start');
  }

  onScrollStartD = () => {
    console.log('Start Drag');
  }

  /*onScrollEnd = () => {
    setTimeout(() => {
      let value = this.state.xOffset._value;
      value = ((Dimensions.get('window').width - 60) - value);
      let index = Math.round(value/(Dimensions.get('window').width - 60));
      //this.setIndex(index);
    }, 100);
  }*/

  render() {
    return (
      <View style={styles.switchContainer}>
        <View style={styles.switchBackground}>
          <Text style={styles.switchBackgroundTemp}>ВРЕМЕННЫЙ</Text>
          <Text style={styles.switchBackgroundPerm}>ПОСТОЯННЫЙ</Text>

          <Animated.View
            style={{
              ...styles.switchActive,
              transform: [{
                translateX: this.state.xOffset.interpolate({
                  inputRange: [0, Dimensions.get('window').width - 60],
                  outputRange: [(Dimensions.get('window').width - 60) / 2, 0]
                })
              }]
            }}
          >
            <Animated.View
              style={{
                ...styles.switchActiveFull,
                transform: [{
                  translateX: this.state.xOffset.interpolate({
                    inputRange: [0, Dimensions.get('window').width - 60],
                    outputRange: [-(Dimensions.get('window').width - 60) / 2, 0]
                  })
                }]
              }}
            >
              <Text style={styles.switchActiveTemp}>ВРЕМЕННЫЙ</Text>
              <Text style={styles.switchActivePerm}>ПОСТОЯННЫЙ</Text>
            </Animated.View>
          </Animated.View>

          <ScrollView
            ref='scrollView'
            pagingEnabled={true}
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={16}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onScroll={this.onScroll}
            onScrollBeginDrag={this.onScrollStartD}
            onMomentumScrollBegin={this.onScrollStart}
            onMomentumScrollEnd={this.onScrollEnd}
            snapToInterval={(Dimensions.get('window').width - 60)}
            style={styles.switchScrollView}
          >
            <Button transparent onPress={this.setIndex.bind(this, 0)} style={styles.switchScrollViewItem}></Button>
            <Button transparent onPress={this.setIndex.bind(this, 1)} style={styles.switchScrollViewItem}></Button>
          </ScrollView>
        </View>
      </View>
    );
  }
}

class NumberGatePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
      isNewNumber: true,
      number: {},
      type: 'temp',
    };

    this.types = ['temp', 'const'];
  }

  componentWillMount() {
    console.log(this.props.navigation.state);
    let { state: { params: { number } = {} } = {} } = this.props.navigation;
    this.setState({
      isNewNumber: !number,
      number: number || {},
      type: number && number.type || this.state.type
    });

    this.typeIndex = this.types.indexOf(number && number.type || this.state.type);
  }

  componentWillUnmount() {
  }

  closeDrawer = () => {
    this.drawer._root.close();
    this.setState({ isDrawerOpen: false });
  }

  openDrawer() {
    this.drawer._root.open();
    this.setState({ isDrawerOpen: true });
  }

  onChangeType = (type) => {
    this.setState({ type: this.types[type] });
  }

  onChangeNumber = (number) => {
    this.setState({ number });
  }

  saveNumber = () => {
    this.state.isNewNumber
      ? this.props.createNumber({ ...this.state.number, type: this.state.type })
      : this.props.updateNumber({ ...this.state.number, type: this.state.type });

    this.props.navigation.dispatch(StackActions.replace({
      routeName: 'Gate',
      params: { saved: true }
    }));
  }

  render() {
    const title = this.state.isNewNumber ? "Добавить номер" : "Изменить номер";
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent style={commonStyles.backArrow} onPress={() => { this.props.navigation.goBack(); }}>
              <VectorIcon style={commonStyles.backArrowIcon} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={commonStyles.headerTitle}>{this.state.isDrawerOpen ? "Меню" : title}</Title>
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
                <Text style={styles.titleBlock}>Введите номер автомобиля</Text>
                <Number onChange={this.onChangeNumber} number={this.state.number} />
              </View>

              <View style={styles.block}>
                <Text style={styles.titleBlock}>Выберите тип номера</Text>
                <TypeNumber onChange={this.onChangeType} value={this.typeIndex} />

                <Text style={styles.comment}>Временные номера дают доступ на территорию в течении одного дня</Text>
              </View>

              <View style={styles.block}>
                <Button bordered rounded full primary style={styles.button} onPress={this.saveNumber} underlayColor="white">
                  <Text>СОХРАНИТЬ НОМЕР</Text>
                </Button>
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
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, actions)(NumberGatePage);
