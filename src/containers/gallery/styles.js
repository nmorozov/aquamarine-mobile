import ThemeVariables from '../../../smart-home-theme/variables/material';
import { Dimensions } from 'react-native';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  row: {
    height: Dimensions.get('window').width / 4,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    width: '30%',
    height: Dimensions.get('window').width / 4,
  },
  image: {
    width: '100%',
    height: 110,
  },
  backButton: {
    position: 'absolute',
    width: 50,
    padding: 13,
    top: 5,
    zIndex: 1
  }
};

export default styles;
  