export const FOOTER_HEIGHT = 64;

const styles = {
  footer: {
    height: FOOTER_HEIGHT,
    backgroundColor: '#e8eeee',
    position: 'absolute',
    bottom: 0,
  },
  footerButton: {
    height: '100%',
    backgroundColor: '#e8eeee',
    borderTopWidth: 4,
    borderRadius: 0,
    borderColor: '#9fc3c0',
    paddingTop: 0,
    paddingBottom: 0,
  },
  mainButton: {
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 8,
    fontFamily: 'Acrom-Medium',
    color: '#221e20',
    lineHeight: 10,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
};

export default styles;
