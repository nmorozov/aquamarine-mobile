// React
import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';

// UI
import { View, Text } from 'native-base';

// Video player
import VideoPlayer from '../../videoPlayer';

// Styles
import styles from './styles';

// Core
import request from '../../../core/request';

let cameras;

const DIRECTION_BACK = 'back';
const DIRECTION_FORWARD = 'forward';

class videoPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slide: 1,
    };
  }

  componentWillMount() {
    cameras = request.doGetCameras();
  }

  getSlide = () => {
    const slide = cameras[this.state.slide];
    return (
      <View>
        <View style={styles.previewImageWrapper}>
          <Image source={{ uri: slide.preview_url }} style={styles.previewImage} />
          <VideoPlayer videoTitle={slide.video_title} videoUrl={slide.video_url} />
        </View>
        <View style={styles.controls}>
          <TouchableHighlight
            style={styles.sliderLeftArrowWrapper}
            onPress={() => { this.switchSlide(DIRECTION_BACK); }}
            underlayColor="white"
          >
            <Image style={styles.sliderArrow} source={require('../../../../img/slider_left.png')} />
          </TouchableHighlight>
          <Text>{slide.video_title}</Text>
          <TouchableHighlight
            style={styles.sliderRightArrowWrapper}
            onPress={() => { this.switchSlide(DIRECTION_FORWARD); }}
            underlayColor="white"
          >
            <Image style={styles.sliderArrow} source={require('../../../../img/slider_right.png')} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  switchSlide = (direction) => {
    const slidesTotal = Object.keys(cameras).length;
    let nextSlide = 1;

    if (direction === DIRECTION_BACK) {
      if ((this.state.slide - 1) < 1) {
        nextSlide = slidesTotal;
      } else {
        nextSlide = this.state.slide - 1;
      }
    } else if (direction === DIRECTION_FORWARD) {
      if ((this.state.slide + 1) > slidesTotal) {
        nextSlide = 1;
      } else {
        nextSlide = this.state.slide + 1;
      }
    }

    this.setState({ slide: nextSlide });
  }

  render() {
    return (
      <View style={styles.widgetWrapper}>
        <View style={styles.widgetHeader}>
          <TouchableHighlight onPress={this.props.goToCamerasPage} underlayColor="white">
            <Text style={styles.camerasText}>Камеры</Text>
          </TouchableHighlight>
          <Text style={styles.camerasDetailText}>подробнее</Text>
        </View>
        {this.getSlide()}
      </View>
    );
  }
}

export default videoPreview;
