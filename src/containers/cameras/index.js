// React
import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';

import Svg, {
  Path,
  G,
} from 'react-native-svg';

import ThemeVariables from '../../../smart-home-theme/variables/material';


import SideBar from '../../components/sidebar';

// UI
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Content,
  Text,
  Right,
  Button,
  Drawer,
  Icon,
} from 'native-base';
import Spinner from '../../components/uiElements/spinner';

// Redux
import { connect } from 'react-redux';
import { fetchCameras } from '../../store/actions/cameras_actions';

// Styles
import styles from './styles';
import commonStyles from '..//..//css/commonStyles';

// Footer Navigations
import FooterNavigation from '../../components/footerNavigation';

// images
import CameraPlayButtonImage from '../../../assets/camera_play_button.png';
import DemoImage from '../../../assets/cam.jpg';

//import cameras from '../../store/constants/cameras';

class Cameras extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
      isModalVideoVisible: false,
      cameraVideoTitle: '',
      cameraVideoUrl: '',
      pagination: {
        'sort[date]': '-1',
      },
    };
  }

  componentWillMount() {
    this.loadCameras(0, this.state.pagination);
  }

  onPageScroll = (e) => {
    if (this.isCloseToBottom(e.nativeEvent)) {
      if (!this.props.isLoadingFinished) {
        this.loadCameras(this.props.loadFrom);
      }
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

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  loadCameras = (from, params = {}) => {
    if (!this.props.isLoading) {
      const currentParams = {
        ...this.state.pagination,
        ...params,
      };

      this.props.fetchCameras(from, currentParams);
    }
  }

  goToCamera = (cameraId) => {
    this.props.navigation.navigate('Camera', { cameraId });
  }

  renderStar = () => (
    <Svg style={styles.star} width="15" height="15" viewBox="0 0 20 20">
      <G transform="translate(-25.000000, -75.000000)">
        <Path d="M34.8910042,90.192306 L29.89433,92.7335753 C29.7466475,92.8086855 29.5660384,92.749854 29.4909282,92.6021715 C29.4622769,92.545837 29.4521492,92.4818928 29.4619898,92.4194618 L30.3348234,86.8820469 L26.3738754,82.9152228 C26.256805,82.7979787 26.2569458,82.6080293 26.3741899,82.4909589 C26.4189134,82.4463016 26.4765983,82.4169096 26.5390147,82.4069764 L32.0751296,81.5259352 L34.6238032,76.5330337 C34.6991322,76.3854627 34.8798284,76.326899 35.0273994,76.402228 C35.0836914,76.4309628 35.1294703,76.4767418 35.1582051,76.5330337 L37.7068787,81.5259352 L43.2429937,82.4069764 C43.40662,82.4330166 43.5181555,82.5867717 43.4921153,82.750398 C43.4821821,82.8128144 43.4527902,82.8704993 43.4081329,82.9152228 L39.4471849,86.8820469 L40.3200185,92.4194618 C40.3458161,92.5831265 40.2340527,92.7367161 40.070388,92.7625137 C40.007957,92.7723544 39.9440128,92.7622266 39.8876783,92.7335753 L34.8910042,90.192306 Z" id="Star" stroke={ThemeVariables.mainApplicationColor} fill={ThemeVariables.mainApplicationColor}></Path>
      </G>
    </Svg>
  )

  renderCameraListItems = (cameras, favorite) => cameras.map(camera => !!camera.favorite == !!favorite && (
    <TouchableOpacity key={camera.id} onPress={() => { this.goToCamera(camera.id); }}>
      <ImageBackground
        source={ camera['image-uri'] ? { uri: camera['image-uri'] } : DemoImage}
        style={styles.previewImage}
        resizeMode="cover"
      >
        {favorite && this.renderStar()}
        <Text style={styles.cameraTitle}>{camera.name}</Text>
        <TouchableOpacity onPress={() => { this.goToCamera(camera.id); }}>
          <Image source={CameraPlayButtonImage} />
        </TouchableOpacity>
      </ImageBackground>
    </TouchableOpacity>
  ));

    renderCameras = () => {
      if (this.props.cameras.length > 0) {
        const cameras = this.props.cameras;
        return (
          <ScrollView
            onScroll={this.onPageScroll}
            contentContainerStyle={styles.cameraListItemWrapper}
          >
            {this.renderCameraListItems(cameras, true)}
            {this.renderCameraListItems(cameras, false)}
          </ScrollView>
        );
      }

      return (
        <View>
          {!this.props.isLoading && <Text style={styles.camerasNotFound}>Список камер пуст</Text>}
          {this.props.isLoading &&
            <Spinner animating />
          }
        </View>
      );
    }

    render() {
      return (
        <Container>
          <Header>
            <Left />
            <Body><Title style={commonStyles.headerTitle}>{this.state.isDrawerOpen ? "Меню" : "Камеры"}</Title></Body>
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
            <ScrollView style={styles.camerasContainer}>
              {this.renderCameras()}
            </ScrollView>
          </Drawer>
          <FooterNavigation active="Cameras" navigation={this.props.navigation} />
        </Container>
      );
    }
}

function mapStateToProps(state) {
  return {
    cameras: state.camerasReducer.toJS().cameras,
    loadFrom: state.camerasReducer.get('loadFrom'),
    isLoading: state.camerasReducer.get('isLoading'),
    isLoadingFinished: state.camerasReducer.get('isLoadingFinished'),
  };
}

const actions = {
  fetchCameras,
};
export default connect(mapStateToProps, actions)(Cameras);

