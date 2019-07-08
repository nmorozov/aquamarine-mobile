import ThemeVariables from '../../../smart-home-theme/variables/material';

const styles = {
  content: {
    paddingTop: 30,
    height: 'auto',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  groupTitle: {
    color: '#C7C7C7',
    fontSize: 16,
    marginTop: 30,
  },
  promotionsItem: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 15,
    height: 97,
    borderLeftWidth: 5,
    borderLeftColor: ThemeVariables.mainApplicationColor,
  },
  promotionsTitle: {
    color: '#fff',
    paddingLeft: 15,
    paddingRight: 40,
    paddingTop: 5,
    fontFamily: 'PFDinTextPro-Medium',
    fontSize: 14,
    backgroundColor: 'transparent',
    zIndex: 3,
    paddingBottom: 20,
  },
  promotionsDate: {
    color: '#fff',
    paddingLeft: 15,
    backgroundColor: 'transparent',
    fontSize: 9,
    fontFamily: 'PFDinTextPro-Light',
    zIndex: 3,
  },
  promotionsNotFound: {
    flex: 1,
    marginTop: 30,
    textAlign: 'center',
  },
  promotionBackgroundImage: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    zIndex: 1,
  },
  detailPromotionButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    zIndex: 3,
  },
  promotionsScrollContainer: {
    width: '90%',
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
};

export default styles;
