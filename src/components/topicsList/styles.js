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
  topicItem: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#FFF5E7',
  },
  topicText: {
    color: '#231F20',
    paddingLeft: 15,
    paddingTop: 5,
    fontFamily: 'PFDinTextPro-Light',
    fontSize: 10,
  },
  topicDate: {
    color: ThemeVariables.mainApplicationColor,
    paddingLeft: 15,
    fontSize: 9,
    fontFamily: 'PFDinTextPro-Regular',
  },
  topicsNotFound: {
    flex: 1,
    marginTop: 30,
    textAlign: 'center',
  },
  topicContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingTop: 5,
  },
  detailTopicButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  topicsScrollContainer: {
    width: '90%',
  },
};

export default styles;
