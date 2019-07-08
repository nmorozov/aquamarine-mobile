import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

import { FOOTER_HEIGHT } from '../footerNavigation/styles.js';
export const HEADER_HEIGHT = 56;

const styles = {
  container: {
    height: height - FOOTER_HEIGHT - HEADER_HEIGHT,
    backgroundColor: '#fff',
  },
  slideTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeSlideTitle: {
    fontFamily: 'PFDinTextPro-Medium',
    color: '#000',
    fontSize: 14,
    paddingLeft: 6,
    paddingRight: 6,
  },
  inactiveSlideTitle: {
    fontFamily: 'PFDinTextPro-Medium',
    color: '#AAAAAA',
    fontSize: 10,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 3,
  },
  element: {
    backgroundColor: '#fff',
  },
  slideTitlesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: '30%',
    backgroundColor: '#fff',
  },
  slideFakeTitle: {
    opacity: 0,
    fontFamily: 'PFDinTextPro-Medium',
    color: '#AAAAAA',
    fontSize: 10,
  },
};

export default styles;
