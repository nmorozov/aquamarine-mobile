// React
import { Alert } from 'react-native';

import Request from '../../core/request';

import ResponseMessagesTranslator from '../../core/responseMessagesTranslator';

export const FETCH_NEWS_START = 'fetch_news_start';
export const FETCH_NEWS_FINISH = 'fetch_news_finish';
export const FETCH_NEWS_FAILED = 'fetch_news_failed';

export const LOAD_NEWS_LIMIT = 10;

const fetchNewsStart = from => ({ type: FETCH_NEWS_START, from });
const fetchNewsFinish = payload => ({ type: FETCH_NEWS_FINISH, payload });
const fetchNewsFailed = () => ({ type: FETCH_NEWS_FAILED });

export function fetchNews(from, params = {}) {
  return (dispatch) => {
    dispatch(fetchNewsStart(from));

    const pagination = {
      ...params,
      ...{ offset: from },
    };
    Request.doGetInterlanContent('doGetNews', pagination)
      .then((response) => {
        dispatch(fetchNewsFinish(response));
      })
      .catch((error) => {
        Alert.alert('Ошибка', ResponseMessagesTranslator('Network request failed'));
        dispatch(fetchNewsFailed());
      });
  };
}
