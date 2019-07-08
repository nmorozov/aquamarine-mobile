import DeviceInfo from 'react-native-device-info';
import base64 from 'base-64';

// Core
import Config, {
  PARAM_ACCESS_TOKEN,
  PARAM_LOGIN_OR_REFRESH_TOKEN,
  PARAM_ACCESS_TOKEN_EXPIRATION_TIME,
  PARAM_REFRESH_TOKEN,
} from './config';
import Network, {
  METHOD_POST,
  METHOD_PUT,
  METHOD_DELETE,
  METHOD_GET,
} from './network';
import { getRandomArbitrary } from './utils';

// Routes
const ROUTE_USER_REGISTER = '/auth/register';
const ROUTE_USER_LOGIN = '/auth/login';
const ROUTE_REFRESH_AUTH_TOKEN = '/auth/refresh';
const ROUTE_NEWS = '/news';
const ROUTE_NEWS_DETAIL = '/news/';
const ROUTE_NOTIFICATIONS = '/event';
const ROUTE_NOTIFICATION_DETAIL = '/event/';
const ROUTE_CAMERAS = '/video';
const ROUTE_CAMERA = '/video/';
const ROUTE_PROMOTIONS = '/promo';
const ROUTE_PROMOTION_DETAIL = '/promo/';
const ROUTE_SMART_GATE = '/smart/gate'
const ROUTE_NUMBERS = '/number'
const ROUTE_NUMBER = '/number/'
const ROUTE_CHAT = '/chat/';

const SERVER_URL = 'http://rugt.pro:5555';
const X_HOME_ID_NAME = 'X-Home-Id';
const X_HOME_ID_VALUE = 'aquamarin';
const AUTHORIZATION = 'Authorization';

/**
 * Requests to
 */
class Request {
  static doAuthorization(userCredentials) {
    return this.doRequest(
      METHOD_POST,
      ROUTE_USER_LOGIN,
      true,
      userCredentials,
    );
  }

  static async doGetInterlanContent(functionForGetContent, filter) {
    let expire = await Config.get(PARAM_ACCESS_TOKEN_EXPIRATION_TIME);

    /*if (Date.now() > expire) {
      let response = await this.doRefreshToken();
      Config.setAuthorizationData(response);
      return this[functionForGetContent](filter);
    }*/

    return this[functionForGetContent](filter);
  }

  static async doRefreshToken() {
    let token = await Config.get(PARAM_REFRESH_TOKEN);
    return this.doRequest(
      METHOD_POST,
      ROUTE_REFRESH_AUTH_TOKEN,
      false,
      { refresh_token: token },
    );
  }

  static async doCheckToken() {
    let token = await Config.get(PARAM_REFRESH_TOKEN);
    return this.doRequest(
      METHOD_POST,
      ROUTE_REFRESH_AUTH_TOKEN,
      false,
      { refresh_token: token },
    );
  }

  static doGetNews(pagination) {
    return this.doRequest(
      METHOD_GET,
      ROUTE_NEWS,
      false,
      pagination,
    );
  }

  static doGetDetailNews(filter) {
    return this.doRequest(
      METHOD_GET,
      ROUTE_NEWS_DETAIL + filter.data_id,
      false,
    );
  }

  static doGetNotifications(filter) {
    return this.doRequest(
      METHOD_GET,
      ROUTE_NOTIFICATIONS,
      false,
      filter,
    );
  }

  static doGetPromotions(filter) {
    return this.doRequest(
      METHOD_GET,
      ROUTE_PROMOTIONS,
      false,
      filter,
    );
  }

  static doGetDetailPromotion(filter) {
    return this.doRequest(
      METHOD_GET,
      ROUTE_PROMOTION_DETAIL + filter.data_id,
      false,
    );
  }

  static doGetDetailNotification(filter) {
    return this.doRequest(
      METHOD_GET,
      ROUTE_NOTIFICATION_DETAIL + filter.data_id,
      false,
    );
  }

  static doGetCameras(filter) {
    return this.doRequest(
      METHOD_GET,
      ROUTE_CAMERAS,
      false,
      filter,
    );
  }

  static doGetCamera(filter) {
    return this.doRequest(
      METHOD_GET,
      ROUTE_CAMERA + filter.data_id,
      false,
    );
  }

  static addFavorite(filter) {
    return this.doRequest(
      METHOD_POST,
      ROUTE_CAMERA + filter.data_id + '/addFavorite',
      false,
      {}
    );
  }

  static removeFavorite(filter) {
    return this.doRequest(
      METHOD_POST,
      ROUTE_CAMERA + filter.data_id + '/removeFavorite',
      false,
      {}
    );
  }

  static doOpenSmartGate() {
    return this.doRequest(
      METHOD_GET,
      ROUTE_SMART_GATE,
      false,
    );
  }

  static doGetNumbers(filter) {
    return this.doRequest(
      METHOD_GET,
      ROUTE_NUMBERS,
      false,
    );
  }

  static doCreateNumber(params) {
    return this.doRequest(
      METHOD_POST,
      ROUTE_NUMBER,
      false,
      params
    );
  }

  static doUpdateNumber(params) {
    return this.doRequest(
      METHOD_PUT,
      ROUTE_NUMBER + params.id,
      false,
      params
    );
  }

  static doDeleteNumber(params) {
    return this.doRequest(
      METHOD_DELETE,
      ROUTE_NUMBER + params.id,
      false,
    );
  }

  static doCreateChat(params) {
    return this.doRequest(
      METHOD_POST,
      ROUTE_CHAT,
      false,
      params,
    );
  }

  static async doRequest(method, route, headersForLoginOrRefresh = false, data = {}) {
    const request = new Network();
    let result = null;
    let headers = null;

    switch (method) {
      case METHOD_POST:
        headers = await this.getHeaders(headersForLoginOrRefresh);
        result = request.post(
          SERVER_URL + route,
          data,
          headers,
        );
        break;
      case METHOD_PUT:
        headers = await this.getHeaders();
        result = request.put(
          SERVER_URL + route,
          data,
          headers,
        );
        break;
      case METHOD_DELETE:
        headers = await this.getHeaders();
        result = request.delete(
          SERVER_URL + route,
          data,
          headers,
        );
        break;
      default:
        headers = await this.getHeaders(headersForLoginOrRefresh);
        result = request.get(
          SERVER_URL + route,
          data,
          headers,
        );
        break;
    }

    return this.processNetworkPromise(result);
  }

  static async processNetworkPromise(result) {
    let response = await result;

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      let responseJson = await response.json();
      if (response.ok) {
        let output = responseJson;

        if (typeof responseJson.data !== 'undefined') {
          output = this.hydrateResponse(responseJson.data, responseJson.included);
        }

        return output;
      } else {
        throw new Error(responseJson.error.message);
      }
    } else {
      console.log(response);
      let responseText = response.text()
      throw new Error(responseText);
    }
  }

  static async getHeaders(forLoginOrRefresh) {
    let authHeader = await (forLoginOrRefresh ?
      this.getAuthHeaderValueForLogin() : this.getAuthHeaderForInternalContent());

    return new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      X_HOME_ID_NAME: X_HOME_ID_VALUE,
      AUTHORIZATION: authHeader,
    });
  }

  static async getAuthHeaderValueForLogin() {
    let loginOrRefreshToken = await Config.get(PARAM_LOGIN_OR_REFRESH_TOKEN);

    let deviceID = DeviceInfo.getUniqueID();

    loginOrRefreshToken = loginOrRefreshToken === null || loginOrRefreshToken === undefined ?
      base64.encode(`${deviceID}:${getRandomArbitrary(1000000000000, 1508227183124)}`) : loginOrRefreshToken;

    Config.set(PARAM_LOGIN_OR_REFRESH_TOKEN, loginOrRefreshToken);

    return `Basic ${loginOrRefreshToken}`;
  }

  static async getAuthHeaderForInternalContent() {
    let token = await Config.get(PARAM_ACCESS_TOKEN);
    return `Bearer ${token}`;
  }

  static hydrateResponse(data, included) {
    let newData = data;

    if (
      typeof included !== 'undefined'
      && included.length > 0
      && typeof data === 'object'
    ) {
      if (
        typeof data.id !== 'undefined'
        && typeof data.type === 'string'
        && Object.keys(data).length === 2
      ) {
        newData = this.hydrateResponse(
          this.searchIncludedResource(data, included),
          included,
        );
      } else {
        Object.keys(data).forEach((key) => {
          if (typeof data[key] === 'object') {
            newData[key] = this.hydrateResponse(data[key], included);
          }
        });
      }
    }

    return newData;
  }

  static searchIncludedResource(resourceId, included) {
    let resource = resourceId;

    for (let i = 0; i < included.length; i += 1) {
      if (
        included[i].type === resourceId.type
        && included[i].id === resourceId.id
      ) {
        resource = included[i].attributes;
        break;
      }
    }

    return resource;
  }
}

export default Request;
