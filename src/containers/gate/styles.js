import ThemeVariables from '../../../smart-home-theme/variables/material';
import { Platform } from 'react-native';

const styles = {
  container: {
    paddingBottom: 20,
    paddingTop: 0,
  },
  block: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingTop: 0,
  },
  titleBlock: {
    color: ThemeVariables.mainApplicationColor,
    fontFamily: 'PFDinTextPro-Medium',
    fontSize: 16,
    paddingTop: 10,
  },
  numberContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 30,
    margin: 7,
  },
  number: {
    width: 200,
    height: 35,
    borderWidth: 2,
    borderColor: '#eee',
    right: -15,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
    paddingBottom: 0,
  },
  editNumber: {
    height: 28,
    marginTop: -6,
    borderWidth: 0,
    borderBottomWidth: 1,
    textAlign: 'center',
    padding: 0,
    marginHorizontal: 1,
    lineHeight: 25
  },
  chars: {
    fontFamily: 'PFDinTextPro-Medium',
    fontSize: 18,
    lineHeight: 25,
    paddingTop: Platform.OS == 'ios' ? 4 : 0,
    bottom: -2,
    color: '#777',
  },
  digits: {
    fontFamily: 'PFDinTextPro-Regular',
    fontSize: 28,
    lineHeight: 30,
    bottom: -2,
    color: '#777',
  },
  region: {
    marginLeft: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: -2,
  },
  regionDigits: {
    fontFamily: 'PFDinTextPro-Regular',
    fontSize: 16,
    lineHeight: Platform.OS == 'ios' ? 14 : 16,
    paddingTop: Platform.OS == 'ios' ? 2 : 0,
    color: '#777',
  },
  flag: {
    width: 16,
    height: 6
  },
  deleteNumber: {
    width: 30,
    marginLeft: 10,
    left: 15,
    top: -5,
    position: 'relative',
  },
  deleteNumberIcon: {
    width: 60,
    fontFamily: 'PFDinTextPro-Light',
    fontSize: 18,
    color: '#ddd',
    left: -10,
  },
  applyNumberIcon: {
    width: 60,
    fontFamily: 'PFDinTextPro-Light',
    fontSize: 18,
    color: '#0f0',
    left: -10,
  },
  comment: {
    fontFamily: 'PFDinTextPro-Light',
    fontSize: 12,
    color: '#ddd',
    textAlign: 'center',
    paddingHorizontal: 90,
    paddingVertical: 10,
  }
};

export default styles;
  