import ThemeVariables from '../../../smart-home-theme/variables/material';

const styles = {
  camerasContainer: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff',
    marginBottom: 64,
  },
  cameraListItemWrapper: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  previewImage: {
    width: 133,
    height: 97,
    position: 'relative',
    borderLeftWidth: 5,
    borderLeftColor: ThemeVariables.mainApplicationColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginRight: 10,
  },
  cameraTitle: {
    fontFamily: 'PFDinTextPro-Medium',
    backgroundColor: 'transparent',
    fontSize: 12,
    color: '#fff',
    position: 'absolute',
    left: 15,
    top: 10,
  },
  star: {
    position: 'absolute',
    right: 5,
    bottom: 10
  },
  cameraButton: {
    marginRight: 10,
  },
  camerasNotFound: {
    flex: 1,
    marginTop: 30,
    textAlign: 'center',
  },
};

export default styles;
