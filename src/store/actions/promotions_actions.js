// React
import { Alert } from 'react-native';

import Request from '../../core/request';

import ResponseMessagesTranslator from '../../core/responseMessagesTranslator';

export const FETCH_PROMOTIONS_START = 'fetch_promotions_start';
export const FETCH_PROMOTIONS_FINISH = 'fetch_promotions_finish';
export const FETCH_PROMOTIONS_FAILED = 'fetch_promotions_failed';

export const LOAD_PROMOTIONS_LIMIT = 10;

const fetchPromotionsStart = from => ({ type: FETCH_PROMOTIONS_START, from });
const fetchPromotionsFinish = payload => ({ type: FETCH_PROMOTIONS_FINISH, payload });
const fetchPromotionsFailed = () => ({ type: FETCH_PROMOTIONS_FAILED });

export function fetchPromotions(from, params = {}) {
  return (dispatch) => {
    dispatch(fetchPromotionsStart(from));

    const pagination = {
      ...params,
      ...{ offset: from },
    };
    Request.doGetInterlanContent('doGetPromotions', pagination)
      .then((response) => {
        dispatch(fetchPromotionsFinish(response));
      })
      .catch((error) => {
        Alert.alert('Ошибка', ResponseMessagesTranslator('Network request failed'));
        dispatch(fetchPromotionsFailed());
      });
  };
}
