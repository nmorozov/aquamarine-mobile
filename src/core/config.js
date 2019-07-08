import DeviceInfo from 'react-native-device-info';
import SecureStorage from 'react-native-secure-storage';

// import mainRealm from '../realm/main';

export const SYSTEM_ANDROID = 'AND';
export const SYSTEM_IOS = 'IOS';
export const SYSTEM_WINDOWS = 'WIN';
export const PARAM_ACCESS_TOKEN = 'access_token';
export const PARAM_REFRESH_TOKEN = 'refresh_token';
export const PARAM_LOGIN_OR_REFRESH_TOKEN = 'login_or_refresh_token';
export const PARAM_ACCESS_TOKEN_EXPIRATION_TIME = 'access_token_expiration_time';
export const APPLICATION_RESIDENTIAL_COMPLEX_NAME = 'Мой Аквамарин';

/**
 * Application configuration
 */
class Config {
  static getSystem() {
    let system = false;

    if (DeviceInfo.getSystemName() === 'Android') {
       system = this.SYSTEM_ANDROID;
    } else if (DeviceInfo.getSystemName() === 'iPhone OS') {
      system = this.SYSTEM_IOS;
    }

    return system;
  }

  static getLocale() {
    return DeviceInfo.getDeviceLocale();
  }

  static getLanguage() {
    return 'ru';
  }

  static get(name) {
    // const config = mainRealm.objects('Config').filtered(`name = "${name}"`);
    // let value = null;

    // if (config.length > 0) {
    //   value = config[0].value;
    // }

    // return value;
    console.log('GET', name);
    return SecureStorage.getItem(name, {});
  }
  
  static set(name, value) {
    // mainRealm.write(() => {
      //   mainRealm.create('Config', { name, value }, true);
      // });
    console.log('SET', name, value);
    SecureStorage.setItem(name, value, {});
  }
  
  static async isLogged() {
    let Request = require('./request').default;

    console.log(require('./request').default);

    try {
      console.log('CHECK');
      await Request.doCheckToken();
    } catch (e) {
      try {
        console.log('REFRESH');
        let newToken = await Request.doRefreshToken();
        this.setAuthorizationData(newToken);
      } catch (e) {
        console.log('FAIL');
        return false;
      }
    }
    
    console.log('SUCCESS');
    let token = await Config.get(PARAM_ACCESS_TOKEN);
    console.log('isLogged', token);
    return !!token;
  }

  static setAuthorizationData(backendResponse) {
    const accessTokenExpirationTime = (backendResponse.expires_in * 24) + Date.now();
    Config.set(PARAM_ACCESS_TOKEN, backendResponse.access_token);
    Config.set(PARAM_REFRESH_TOKEN, backendResponse.refresh_token);
    Config.set(PARAM_ACCESS_TOKEN_EXPIRATION_TIME, accessTokenExpirationTime.toString());
  }

  static clearAuthorizationData() {
    Config.set(PARAM_ACCESS_TOKEN, '');
    Config.set(PARAM_REFRESH_TOKEN, '');
    Config.set(PARAM_ACCESS_TOKEN_EXPIRATION_TIME, '');
  }
}

export default Config;
