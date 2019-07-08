// React
import { Alert } from 'react-native';

// Core
import Request from '../../core/request';
import Config from '../../core/config';
import ResponseMessagesTranslator from '../../core/responseMessagesTranslator';

export const DO_LOGIN = 'DO_LOGIN';
export const DO_LOGOUT = 'DO_LOGOUT';
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_FINISH = 'LOGIN_FINISH';
export const LOGIN_FAILED = 'LOGIN_FAILED';

const loginStart = () => ({
  type: LOGIN_START,
});

const loginFinish = payload => ({
  type: LOGIN_FINISH,
  payload,
});

const logOut = () => ({
  type: DO_LOGOUT,
});

const loginFailed = (error) => {
  Alert.alert('Ошибка', ResponseMessagesTranslator(error.message));

  return {
    type: LOGIN_FAILED,
  };
};

export function doLogin(userName, password, onSuccess) {
  return (dispatch) => {
    dispatch(loginStart());
    Request.doAuthorization({ username: userName, password })
      .then((response) => {
        console.log('Success auth');
        Config.setAuthorizationData(response);
        dispatch(loginFinish());
        onSuccess();
      })
      .catch((error) => {
        dispatch(loginFailed(error));
      });
  };
}

export const showLoading = () => ({ type: SHOW_LOADING });

export const hideLoading = () => ({ type: HIDE_LOADING });

export function doLogOut(navigation) {
  Config.clearAuthorizationData();
  navigation.navigate('Login');
  return (dispatch) => {
    dispatch(logOut());
  };
}
