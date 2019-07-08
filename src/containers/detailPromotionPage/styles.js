import ThemeVariables from '../../../smart-home-theme/variables/material';

const styles = {
  promotionsTitle: {
    color: '#fff',
    paddingHorizontal: 50,
    paddingTop: 5,
    fontFamily: 'Acrom-Medium',
    fontSize: 12,
    backgroundColor: 'transparent',
    zIndex: 3,
    paddingBottom: 20,
  },
  promotionsDate: {
    color: '#fff',
    paddingHorizontal: 50,
    backgroundColor: 'transparent',
    fontSize: 9,
    fontFamily: 'Acrom-Light',
    zIndex: 3,
  },
  promotionBackgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    zIndex: 1,
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
    opacity: 0.5,
  },
  imageTitleContainer: {
    height: 110,
    width: '100%',
    borderBottomWidth: 5,
    borderBottomColor: "#9fc3c0",
  },
  htmlView: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  htmlContent: {
      p: {
        color: '#000000',
        fontFamily: 'Acrom-Regular',
        fontSize: 10,
        lineHeight: 17,
      }
  }
};

export default styles;
