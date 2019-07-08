import ThemeVariables from '../../../smart-home-theme/variables/material';

const styles = {
  button: {
    marginTop: '10%',
  },
  subjectInput: {
    textAlign: 'left',
    borderBottomWidth: 0.4,
    height: 30,
    borderBottomColor: ThemeVariables.mainApplicationColor,
    color: '#000',
    fontFamily: 'PFDinTextPro-Regular',
    fontSize: 12,
    marginBottom: 10,
    padding: 0,
    paddingRight: 20,
    paddingLeft: 20,
  },
  textInput: {
    width: '100%',
    height: 200,
    textAlign: 'left',
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: ThemeVariables.mainApplicationColor,
    color: '#000',
    fontFamily: 'PFDinTextPro-Regular',
    fontSize: 12,
    marginBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    paddingVertical: 20,
  },
  formItem: {
    borderStyle: 'solid',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    width: '100%',
    borderBottomWidth: 0,
  },
  form: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 20,
  },
};

export default styles;
  