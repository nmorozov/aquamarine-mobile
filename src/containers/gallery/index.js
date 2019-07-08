// React
import React, { Component } from 'react';
import {
  BackHandler,
  TouchableHighlight,
  Platform,
  Dimensions,
  Text,
  View,
  Image,
} from 'react-native';

import Gallery from 'react-native-image-gallery';

// UI
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Button,
  Drawer,
  Icon,
} from 'native-base';
import SideBar from '../../components/sidebar';

import VectorIcon from 'react-native-vector-icons/Ionicons';

// Redux
import { connect } from 'react-redux';

// Footer Navigations
import FooterNavigation from '../../components/footerNavigation';

// Styles
import commonStyles from '../../css/commonStyles';
import styles from './styles'

const images = [
  { uri: 'https://pp.userapi.com/c636330/v636330864/53915/B0gOgwwG4d8.jpg' },
  { uri: 'https://pp.userapi.com/c636330/v636330864/53929/-SUREa3_d-E.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b260/j-_XPPq3tLg.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b26a/eLPCrQd2BLc.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b274/y7BFMH2FkoQ.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b27e/fNn8n6LyawM.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b288/cuzwWQTVJaQ.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b292/DorR-bLtqXo.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b29c/rzgOguaw5Q8.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b2a5/rREQdQYfK5U.jpg' },
];

const largeImages = [
  { uri: 'https://pp.userapi.com/c636330/v636330864/53914/yg0Rs7IM8ks.jpg' },
  { uri: 'https://pp.userapi.com/c636330/v636330864/53928/dmKnrbAaRnI.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b25f/IcRvc6ArrQY.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b269/J-TC2Fz5Tms.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b273/AUfnPZ9CN1o.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b27d/d3BCyUc3aKA.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b287/XcqH1G5B77k.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b291/Akoxm8qHyvw.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b29b/sJl_8NEPO7w.jpg' },
  { uri: 'https://pp.userapi.com/c638319/v638319864/2b2a4/Q9HenapvVHY.jpg' },
];

class GalleryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
      isImageOpen: false
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    console.log('onBackPress', this.state.isImageOpen)
    if (this.state.isImageOpen !== false) {
      this.setState({ isImageOpen: false });
      return true;
    }

    return false;
  }

  closeDrawer() {
    this.drawer._root.close();
    this.setState({ isDrawerOpen: false });
  }

  openDrawer() {
    this.drawer._root.open();
    this.setState({ isDrawerOpen: true });
  }

  goTo(name) {
    this.props.navigation.navigate(name);
  }

  openImage = (index) => {
    this.setState({ isImageOpen: index })
  }

  closeImage = () => {
    this.setState({ isImageOpen: false })
  }

  renderImages = (row) => {
    let imagesList = [];
    for (let i = row * 3; i < (row + 1) * 3; i++)
      imagesList.push(<Button key={i} transparent style={styles.item} onPress={this.openImage.bind( this, i )}>
        <Image style={styles.image} resizeMode={'contain'} source={images[i]} />
      </Button>);
    
    return imagesList;
  }

  renderViews = () => {
    let views = [];
    for (let v = 0; v < (images.length/3); v++)
      views.push(<View key={v} style={styles.row}>{this.renderImages(v)}</View>);
    
    return views;
  }

  render() {

    const ImageViwe = (
      <Container>
        <Button transparent style={styles.backButton} onPress={this.closeImage}>
          <VectorIcon style={commonStyles.backArrowIcon} name="ios-arrow-back" />
        </Button>
        <Gallery
          style={{ flex: 1, backgroundColor: "black" }}
          initialPage={+this.state.isImageOpen}
          images={largeImages.map(img => {
            return  {
              source: {
                uri: img.uri
              },
              dimensions: {
                width: 1080,
                height: 1920
              }
            }
          })}
        />
      </Container>
    );

    const Brows = (
      <Container>
        <Header>
          <Left>
            <Button transparent style={commonStyles.backArrow} onPress={() => { this.props.navigation.goBack(); }}>
              <VectorIcon style={commonStyles.backArrowIcon} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={commonStyles.headerTitle}>{this.state.isDrawerOpen ? "Меню" : "Галерея"}</Title>
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
            <View style={styles.container}>
              {this.renderViews()}
            </View>
        </Drawer>
        <FooterNavigation navigation={this.props.navigation} />
          
      </Container>
    );

    return this.state.isImageOpen !== false ? ImageViwe : Brows;
  }
}

const actions = {
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, actions)(GalleryPage);
