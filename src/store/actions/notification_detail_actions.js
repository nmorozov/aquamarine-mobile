
// Core
import Request from '../../core/request';

export const NOTIFICATION_DETAIL_LOAD_START = 'NOTIFICATIONS_DETAIL_LOAD_START';
export const NOTIFICATION_DETAIL_LOAD_FINISH = 'NOTIFICATIONS_DETAIL_LOAD_FINISH';

const notificationDetailLoadStart = () => ({ type: NOTIFICATION_DETAIL_LOAD_START });
const notificationDetailLoadFinish = payload => (
  { type: NOTIFICATION_DETAIL_LOAD_FINISH, payload }
);

export function getNotificationDetail(notificationId) {
  return (dispatch) => {
    dispatch(notificationDetailLoadStart());

    Request.doGetInterlanContent('doGetDetailNotification', { data_id: notificationId })
      .then((response) => {
        dispatch(notificationDetailLoadFinish(response));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
