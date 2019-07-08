const styles = {
  componentContainer: {
    overflow: 'visible',
  },
  topButtons: {
    container: {
      flexDirection: 'row',
      borderBottomWidth: 3,
      height: 57,
      borderBottomColor: '#9fc3c0',
    },
    button: {
      flex: 1,
      borderRadius: 0,
      backgroundColor: '#ffffff',
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
      lineHeight: 14,
    },
    imageStar: {
      width: 25,
      height: 24,
    },
    image: {
      width: 25,
      height: 24,
    },
    imageCalendar: {
      width: 26,
      height: 26,
    },
  },
};

export default styles;
