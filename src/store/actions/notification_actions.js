// React
import { Alert } from 'react-native';

import Request from '../../core/request';

import ResponseMessagesTranslator from '../../core/responseMessagesTranslator';

export const FETCH_NOTIFICATIONS_START = 'fetch_notifications_start';
export const FETCH_NOTIFICATIONS_FINISH = 'fetch_notifications_finish';
export const FETCH_NOTIFICATIONS_FAILED = 'fetch_notifications_failed';

export const LOAD_NOTIFICATIONS_LIMIT = 10;

const fetchNotificationsStart = from => ({ type: FETCH_NOTIFICATIONS_START, from });
const fetchNotificationsFinish = payload => ({ type: FETCH_NOTIFICATIONS_FINISH, payload });
const fetchNotificationsFailed = () => ({ type: FETCH_NOTIFICATIONS_FAILED });

export function fetchNotifications(from, params = {}) {
  return (dispatch) => {
    dispatch(fetchNotificationsStart(from));

    const pagination = {
      ...params,
      ...{ offset: from },
    };
    Request.doGetInterlanContent('doGetNotifications', pagination)
      .then((response) => {
        dispatch(fetchNotificationsFinish(response));
      })
      .catch(() => {
        dispatch(fetchNotificationsFailed());
      });
  };
}
