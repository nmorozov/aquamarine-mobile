import { Platform } from 'react-native';
import ThemeVariables from '../../../smart-home-theme/variables/material';

const styles = {
  componentContainer: {
    overflow: 'visible',
  },
  topButtons: {
    container: {
      flexDirection: 'row',
      borderBottomWidth: 3,
      height: 57,
      backgroundColor: '#fff',
      borderBottomColor: '#9fc3c0',
    },
    button: {
      flex: 1,
      borderRadius: 0,
      backgroundColor: 'transparent',
      height: 54,
      shadowRadius: 0,
      borderWidth: 0,
      elevation: 0,
      shadowOffset: { width: 0, height: 0 },
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonActive: {
      backgroundColor: '#9fc3c0',
    },
    bordered: {
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderRadius: 0,
      borderRightColor: '#F5F5F5',
      borderBottomColor: '#F5F5F5',
      shadowRadius: 0,
    },
    text: {
      elevation: 0,
      shadowColor: '#fff',
      fontFamily: 'Acrom-Regular',
      fontSize: 10,
      color: '#000',
      lineHeight: 13,
    },
    imageStar: {
      width: 25,
      height: 24,
    },
    imageCalendar: {
      width: 26,
      height: 26,
    },
  },
  calendarContainer: {
    flex: 1,
    flexGrow: 1,
  },
  calendarInternalContentContainer: {
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? 64 : 56,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  timePicker: {
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 45,
    },
    input: {
      width: 37,
      height: 40,
      padding: 5,
      borderBottomWidth: 3,
      borderBottomColor: ThemeVariables.mainApplicationColor,
      textAlign: 'center',
      fontFamily: 'PFDinTextPro-Regular',
      color: '#2F3946',
      fontSize: 24,
    },
    delimer: {
      marginLeft: 10,
      marginRight: 10,
      fontFamily: 'PFDinTextPro-Regular',
      color: '#2F3946',
      fontSize: 24,
    },
  },
  submitButton: {
    button: {
      marginTop: 20,
      marginBottom: 20,
      width: '90%',
      alignSelf: 'center',
    },
    text: {
      color: '#2F3946',
    },
  },
  calendarDaysText: {
    fontFamily: 'PFDinTextPro-Regular',
    color: '#2F3946',
  },
};

export default styles;
