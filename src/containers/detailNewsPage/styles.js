import ThemeVariables from '../../../smart-home-theme/variables/material';

const styles = {
  newsTitle: {
    color: '#000000',
    paddingHorizontal: 20,
    paddingTop: 10,
    fontFamily: 'PFDinTextPro-Light',
    fontSize: 12,
    backgroundColor: 'transparent',
    zIndex: 3,
    paddingBottom: 10,
  },
  newsDate: {
    paddingTop: 30,
    color: ThemeVariables.mainApplicationColor,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    fontSize: 9,
    fontFamily: 'Acrom-Regular',
    zIndex: 3,
  },
  imageTitleContainer: {
    height: 110,
    width: '100%',
    borderBottomWidth: 5,
    borderBottomColor: "#9fc3c0",
  },
  newsBackgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    zIndex: 1,
  },
  htmlView: {
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  htmlContent: {
      p: {
        color: '#000000',
        fontFamily: 'Acrom-Regular',
        fontSize: 10,
        lineHeight: 17,
      },
      ul: {
        color: '#000000',
        fontFamily: 'Acrom-Regular',
        fontSize: 10,
        lineHeight: 17,
      },
      ol: {
        color: '#000000',
        fontFamily: 'Acrom-Regular',
        fontSize: 10,
        lineHeight: 17,
      }
  }
};

export default styles;
