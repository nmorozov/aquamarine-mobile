// React
import React, { Component } from 'react';
import { BackHandler } from 'react-native';

// Redux
import { connect } from 'react-redux';

// Navigation
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import LoginScreen from '../containers/login';
import HomeScreen from '../containers/home';
//import RegistrationScreen from '../containers/registration';
import WidhetsScreen from '../containers/widgets';
import SecurityScreen from '../containers/security';
import CamerasScreen from '../containers/cameras';
import CameraScreen from '../containers/camera';
import DetailNewsPage from '../containers/detailNewsPage';
import DetailNotificationPage from '../containers/detailNotificationPage';
import DetailPromotionPage from '../containers/detailPromotionPage';
import About from '../containers/about';
import Chat from '../containers/chat';
import ChatInner from '../containers/chatInner';
import ChatForm from '../containers/chatForm';
import Gallery from '../containers/gallery';
import Contacts from '../containers/contacts';
import Gate from '../containers/gate';
import NumberGate from '../containers/numberGate';

const fade = (props) => {
  const {position, scene} = props

  console.log('FADE', scene.route.routeName);
  if (scene.route.routeName == 'Login') return {};

  const index = scene.index

  const translateX = 0
  const translateY = 0

  const opacity = position.interpolate({
      inputRange: [index - 0.7, index, index + 0.7],
      outputRange: [0.3, 1, 0.3]
  })

  return {
      opacity,
      transform: [{translateX}, {translateY}]
  }
}

export const AppNavigator = StackNavigator(
  {
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreen },
    //Registration: { screen: RegistrationScreen },
    Widgets: { screen: WidhetsScreen },
    Security: { screen: SecurityScreen },
    Cameras: { screen: CamerasScreen },
    Camera: { screen: CameraScreen },
    DetailNewsPage: { screen: DetailNewsPage },
    DetailNotificationPage: { screen: DetailNotificationPage },
    DetailPromotionPage: { screen: DetailPromotionPage },
    About: { screen: About },
    Chat: { screen: Chat },
    ChatInner: { screen: ChatInner },
    ChatForm: { screen: ChatForm },
    Gallery: { screen: Gallery },
    Contacts: { screen: Contacts },
    Gate: { screen: Gate },
    NumberGate: { screen: NumberGate },
  },
  {
    headerMode: 'none',
    transitionConfig: () => ({
      screenInterpolator: (props) => {
        return fade(props)
      }
    })
  },
);

class SmartHome extends Component {
  componentDidMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, navigation } = this.props;
    if (navigation.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, navigation } = this.props;
    //const navigationWithHelpers = addNavigationHelpers({
    //  dispatch,
    //  state: navigation,
    //});

    return <AppNavigator />;
  }
}

const mapStateToProps = state => ({
  navigation: state.navigationReducer,
});

export default connect(mapStateToProps)(SmartHome);
