import { Dimensions } from 'react-native';

const styles = {
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  logo: {
    container: {
      position: 'absolute',
      width: 117,
      height: 95,
      left: (Dimensions.get('window').width / 2) - 58,
      top: 40,
      zIndex: 20,
      elevation: 20,
    },
    image: {
      width: 117,
      height: 95,
    },
  },
  drawer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%'
  }
};

export default styles;
