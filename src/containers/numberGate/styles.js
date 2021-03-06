import ThemeVariables from '../../../smart-home-theme/variables/material';
import { Dimensions, Platform } from 'react-native';

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
    paddingTop: 10,
  },
  titleBlock: {
    color: ThemeVariables.mainApplicationColor,
    fontFamily: 'PFDinTextPro-Medium',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  numberContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    margin: 7,
  },
  number: {
    width: 300,
    height: 50,
    borderWidth: 2,
    borderColor: '#eee',
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 3,
  },
  editNumber: {
    height: 35,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius : 1,
    borderColor: ThemeVariables.mainApplicationColor,
    textAlign: 'center',
    padding: 0,
    paddingTop: 5,
    paddingHorizontal: 2,
    marginHorizontal: 2,
  },
  chars: {
    fontFamily: 'PFDinTextPro-Medium',
    fontSize: 20,
    lineHeight: Platform.OS == 'ios' ? 20 : 25,
    bottom: -2,
    color: '#777',
  },
  digits: {
    fontFamily: 'PFDinTextPro-Regular',
    fontSize: 30,
    lineHeight: 30,
    bottom: -2,
    color: '#777',
  },
  region: {
    marginLeft: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  regionDigits: {
    fontFamily: 'PFDinTextPro-Regular',
    fontSize: 16,
    lineHeight: Platform.OS == 'ios' ? 16 : 18,
    paddingBottom: -5,
    color: '#777',
    textAlign: 'center',
  },
  flag: {
    width: 20,
    height: 12,
    marginLeft: 7,
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
    paddingHorizontal: 70,
    paddingVertical: 10,
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    margin: 7,
  },
  switchBackground: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#ddd',
    height: 50,
    width: (Dimensions.get('window').width - 54)
    //borderWidth: 3,
    //borderColor: '#ddd',
  },
  switchActive: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 44,
    width: (Dimensions.get('window').width - 60) / 2,
    margin: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 25,
  },
  switchActiveFull: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: (Dimensions.get('window').width - 60),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  switchBackgroundTemp: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'PFDinTextPro-Medium',
    fontSize: 12,
    paddingVertical: 18,
    color: '#999',
  },
  switchBackgroundPerm: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'PFDinTextPro-Medium',
    fontSize: 12,
    paddingVertical: 18,
    color: '#999',
  },
  switchActiveTemp: {
    width: (Dimensions.get('window').width - 60) / 2,
    textAlign: 'center',
    fontFamily: 'PFDinTextPro-Medium',
    fontSize: 12,
    paddingVertical: 15,
    color: ThemeVariables.mainApplicationColor,
  },
  switchActivePerm: {
    textAlign: 'center',
    fontFamily: 'PFDinTextPro-Medium',
    fontSize: 12,
    paddingVertical: 15,
    color: ThemeVariables.mainApplicationColor,
    width: (Dimensions.get('window').width - 60) / 2,
  },
  switchScrollView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 44,
    width: (Dimensions.get('window').width - 60),
    margin: 3,
    borderRadius: 25,
  },
  switchScrollViewItem: {
    width: (Dimensions.get('window').width - 60),
  },
  button: {
    marginTop: 10
  }
};

export default styles;
  