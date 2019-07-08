// react
import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  TouchableHighlight,
  Image,
} from 'react-native';

// redux
import { connect } from 'react-redux';
import { getCamera, toggleFavorite } from '../../store/actions/camera_actions';
import { fetchCameras } from '../../store/actions/cameras_actions';

// UI
import Base, {
  Container,
  Header,
  Left,
  Body,
  Title,
  Content,
  Right,
  Text,
  Icon,
  Button,
  Drawer,
} from 'native-base';

import SideBar from '../../components/sidebar';

import VectorIcon from 'react-native-vector-icons/Ionicons';

import Spinner from '../../components/uiElements/spinner';

// Video player
import VideoPlayer from '../../components/videoPlayer/VideoPlayer';

// Styles
import commonStyles from '../../css/commonStyles';
import ThemeVariables from '../../../smart-home-theme/variables/material';
import styles from './styles';

// Footer Navigations
import FooterNavigation from '../../components/footerNavigation';
import { FOOTER_HEIGHT } from '../../components/footerNavigation/styles';

// top panel
import CameraTopPanel from '../../components/cameraTopPanel';

import DemoImage from '../../../assets/cam.jpg';

const HEADER_HEIGHT = ThemeVariables.toolbarHeight; //Platform.OS == 'ios' ? 113 : ThemeVariables.toolbarHeight;
const MINIMIZED_VIDEO_HEIGHT = 220;
const DESCRIPTION_HEIGHT = 300;

class Camera extends Component {
    constructor(props) {
      super(props);

        this.state = {
          isDrawerOpen: false,
        }

      this.animations = {
        bottomControl: {
          height: new Animated.Value(FOOTER_HEIGHT),
          opacity: new Animated.Value(1),
        },
        topControl: {
          height: new Animated.Value(HEADER_HEIGHT),
          opacity: new Animated.Value(1),
        },
        player: {
          height: new Animated.Value(MINIMIZED_VIDEO_HEIGHT),
        },
        description: {
          height: new Animated.Value(DESCRIPTION_HEIGHT),
          padding: new Animated.Value(20),
        },
        cameraTopPanel: {
          height: new Animated.Value(57),
        },
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
      //Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
      this.props.getCamera(this.props.navigation.state.params.cameraId);
    }

    componentDidMount() {
      //Orientation.addOrientationListener(this.orientationDidChange);
    }

    componentWillUnmount() {
      //Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
      //Orientation.removeOrientationListener(this.orientationDidChange);
    }

    onFilter = (date) => {
      console.log(date);
    }

    toggleFavorite = () => {
      this.props.toggleFavorite(this.props.camera.id, this.props.camera.favorite);
      this.props.fetchCameras(0);
    }

    orientationDidChange = (orientation) => {

      if (this.cameraTopPanel.isCalendarOpened() === true) {
        return false;
      }

      setTimeout(() => {
        if (orientation === 'LANDSCAPE') {
          this.hideControlAnimation();
          this.maximizeVideo();
          if (this.player.state.isFullscreen === false) {
            this.player.methods.toggleFullscreen();
          }
        } else if (this.player.state.isFullscreen === true && orientation === 'PORTRAIT') {
          this.maximizeVideo();
        }
      }, 300);
    }

    hideControlAnimation() {
      Animated.parallel([
        Animated.timing(
          this.animations.bottomControl.height,
          { toValue: 0 },
        ),
        Animated.timing(
          this.animations.bottomControl.opacity,
          { toValue: 0 },
        ),
        Animated.timing(
          this.animations.topControl.height,
          { toValue: 0 },
        ),
        Animated.timing(
          this.animations.description.height,
          { toValue: 0 },
        ),
        Animated.timing(
          this.animations.description.padding,
          { toValue: 0 },
        ),
        Animated.timing(
          this.animations.cameraTopPanel.height,
          { toValue: 0 },
        ),
      ]).start();
    }

    showControlAnimation() {
      Animated.parallel([
        Animated.timing(
          this.animations.bottomControl.height,
          { toValue: FOOTER_HEIGHT },
        ),
        Animated.timing(
          this.animations.bottomControl.opacity,
          { toValue: 1 },
        ),
        Animated.timing(
          this.animations.topControl.height,
          { toValue: HEADER_HEIGHT },
        ),
        Animated.timing(
          this.animations.topControl.opacity,
          { toValue: 1 },
        ),
        Animated.timing(
          this.animations.description.height,
          { toValue: DESCRIPTION_HEIGHT },
        ),
        Animated.timing(
          this.animations.description.padding,
          { toValue: 20 },
        ),
        Animated.timing(
          this.animations.cameraTopPanel.height,
          { toValue: 57 },
        ),
      ]).start();
    }

    toggleFullscreen = (isFullscreen) => {
      if (isFullscreen) {
        this.hideControlAnimation();
        this.maximizeVideo();
      } else {
        this.showControlAnimation();
        this.resetVideoSize();
      }
    }

    maximizeVideo() {
      const heightModifier = Platform.OS === 'ios' ? 0 : 24;
      Animated.parallel([
        Animated.timing(
          this.animations.player.height,
          { toValue: Dimensions.get('window').height - heightModifier },
        ),
      ]).start();
    }

    resetVideoSize() {
      Animated.parallel([
        Animated.timing(
          this.animations.player.height,
          { toValue: 220 },
        ),
      ]).start();
    }

    renderCamera = () => {
      if (this.props.isLoading) {
        return <Spinner animating />;
      }

      console.log('CAMERA', this.props.camera);

      return (
        <Container>
          <Animated.View style={{
                    height: this.animations.topControl.height,
                    opacity: this.animations.topControl.opacity,
            }}
          >
            <Header>
              <Left>
                <TouchableHighlight style={commonStyles.backArrow} underlayColor="rgba(0, 0, 0, 0)" onPress={() => { this.props.navigation.goBack(); }}>
                  <VectorIcon style={commonStyles.backArrowIcon} name="ios-arrow-back" />
                </TouchableHighlight>
              </Left>
              <Body><Title style={commonStyles.headerTitle}>{this.state.isDrawerOpen ? "Меню" : this.props.camera.name}</Title></Body>
              <Right>
                <Button
                  transparent
                  onPress={(this.state.isDrawerOpen ? this.closeDrawer : this.openDrawer).bind(this)}
                >
                  <Icon name={this.state.isDrawerOpen ? "close" : "menu"}  />
                </Button>
              </Right>
            </Header>
          </Animated.View>
          <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<SideBar close={() => this.closeDrawer()} navigation={this.props.navigation} />}
            onClose={() => this.closeDrawer()}
            openDrawerOffset={0}
            styles={{}}
            side="right"
          >
            <Animated.View style={{ height: this.animations.cameraTopPanel.height }}>
              <CameraTopPanel
                onFilter={this.onFilter}
                toggleFavorite={this.toggleFavorite}
                camera={this.props.camera}
                navigation={this.props.navigation}
                ref={(ref) => { this.cameraTopPanel = ref; }}
              />
            </Animated.View>
            <Animated.View style={{ height: this.animations.player.height }}>
              {this.props.camera && this.props.camera.uri ? (
                <VideoPlayer
                  source={{ uri: this.props.camera.uri/*'rtsp://admin:admin@192.168.1.168:554/0'*//*this.props.camera['streaming-uri']*/ }}
                  style={styles.player}
                  paused
                  disableVolume
                  disableBack
                  onScreenSizeChanged={this.toggleFullscreen}
                  seekColor={ThemeVariables.mainApplicationColor}
                  ref={(ref) => { this.player = ref; }}
                />
              ) : (
                <Animated.View source="" style={styles.player} />
              )}
            </Animated.View>
            <Animated.View style={[
                styles.cameraDescriptionContainer,
                {
                  height: this.animations.description.height,
                  padding: this.animations.description.padding,
                },
              ]}
            >
              <Text style={styles.cameraDescriptionText}>
                {/*Описание камеры*/}
              </Text>
            </Animated.View>
          </Drawer>
          <Animated.View style={{
                    height: this.animations.bottomControl.height,
                    opacity: this.animations.bottomControl.opacity
            }}
          >
            <FooterNavigation active="Cameras" navigation={this.props.navigation} />
          </Animated.View>
        </Container>
      );
    }

    render() {
      return this.renderCamera();
    }
}

const actions = {
  getCamera,
  toggleFavorite,
  fetchCameras
};

function mapStateToProps(state) {
  return {
    camera: state.cameraReducer.toJS().camera,
    isLoading: false,//state.cameraReducer.get('isLoading'),
  };
}

export default connect(mapStateToProps, actions)(Camera);
