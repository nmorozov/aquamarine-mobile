// React
import React, { Component } from 'react';
import {
  TouchableHighlight,
  Platform,
  Dimensions,
  Text,
  View,
  Image,
} from 'react-native';

import HTMLView from 'react-native-htmlview';

import Svg, {
    Path
} from 'react-native-svg';

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

// Redux
import { connect } from 'react-redux';

// Footer Navigations
import FooterNavigation from '../../components/footerNavigation';

// Styles
import commonStyles from '..//..//css/commonStyles';
import styles from './styles'

const FOOTER_HEIGHT = 49;
const HEADER_HEIGHT = 56;
const PLATFORM = Platform.OS;

class AboutPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false
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

  htmlText = "" +
    "<p style=\"text-align: justify;\">АКВАМАРИН – новый жилой проект компании DARS' Development. Это качественный жилой квартал для продвинутых и современных. ЖК АКВАМАРИН строится по европейским образцам с применением современных инженерных технологий и стройматериалов в районе с уже сложившейся инфраструктурой: детские сады, школа, вуз, учреждения здравоохранения, крупная транспортная развязка, наш любимый ТРЦ АКВАМОЛЛ – все это будет рядом.</p>" +
    "<img alt=\"Aqua_Cam_01.jpg\" src=\"https://aquamarin73.ru/upload/medialibrary/d23/Aqua_Cam_01.jpg\" title=\"Aqua_Cam_01.jpg\"><br>" +
    "<p style=\"text-align: justify;\">АКВАМАРИН – это жилой комплекс с уникальным наполнением. Собственная благоустроенная набережная на Свияге с каскадным спуском к воде и аллеями вдоль всего берега; охраняемые дворы без машин; дендропарк с редкими видами растений; зоны отдыха для всей семьи; просторная парковка за пределами дворов; администратор и сотрудник службы охраны в каждом доме – все эти преимущества наполняют АКВАМАРИН уютной и по-настоящему европейской атмосферой.</p>" +
    "<img alt=\"Aqua_Cam_ 08.jpg\" src=\"https://aquamarin73.ru/upload/medialibrary/a7c/Aqua_Cam_-08.jpg\" title=\"Aqua_Cam_ 08.jpg\"><br>" +
    "<p style=\"text-align: justify;\">Система «умный дом» в каждой квартире поможет оптимизировать потребление ресурсов и сделать вашу жизнь максимально комфортной и безопасной. А более 20 вариантов планировочных решений и smart-планировки позволяют создать уникальный интерьер каждой квартиры.</p>" +
    "<p style=\"text-align: justify;\">АКВАМАРИН - это место, где современный стиль и удобная инфраструктура сочетаются с уникальной природной средой. Это квартал для тех, кто ценит время и хочет всегда быть в центре.&nbsp;</p>" +
    "<img alt=\"Aqua_Cam_ 10.jpg\" src=\"https://aquamarin73.ru/upload/medialibrary/1a8/Aqua_Cam_-10.jpg\" title=\"Aqua_Cam_ 10.jpg\"><br>" +
    "<p style=\"text-align: justify;\">Успейте купить свою квартиру мечты на набережной АКВАМОЛЛА!</p>";

    renderNode(node, index, siblings, parent, defaultRenderer) {
      if (node.name == 'img') {
          const a = node.attribs;
          return ( <Image resizeMode='contain' style={{ width: 300, height: 300 }} source={{uri: a.src}}/> );
      }
    }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent style={commonStyles.backArrow} onPress={() => { this.props.navigation.goBack(); }}>
              <VectorIcon style={commonStyles.backArrowIcon} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={commonStyles.headerTitle}>{this.state.isDrawerOpen ? "Меню" : "О ЖК"}</Title>
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
          type="displace"
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
            <HTMLView renderNode={this.renderNode} style={styles.htmlView} stylesheet={styles.htmlContent} value={this.htmlText} />
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

export default connect(mapStateToProps, actions)(AboutPage);
