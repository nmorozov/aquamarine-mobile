import { fromJS } from 'immutable';

import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_FINISH,
  FETCH_NOTIFICATIONS_FAILED,
  LOAD_NOTIFICATIONS_LIMIT,
} from '../actions/notification_actions';

const initialState = fromJS({
  notifications: [],
  offset: 0,
  isLoading: false,
  isLoadingFinished: false,
});

export default function notificationsReducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case FETCH_NOTIFICATIONS_START:
      if (action.from === 0) {
        newState = state.set('notifications', [])
          .set('loadFrom', 0)
          .set('isLoading', true)
          .set('isLoadingFinished', false);
      } else {
        newState = state.set('isLoading', true);
      }
      break;
    case FETCH_NOTIFICATIONS_FINISH:
      if (action.payload.length > 0) {
        newState = state.set('isLoading', false)
          .update('notifications', value => value.concat(action.payload))
          .update('loadFrom', value => value + action.payload.length)
          .set(
            'isLoadingFinished',
            action.payload.length !== LOAD_NOTIFICATIONS_LIMIT,
          );
      } else {
        newState = state.set('isLoading', false)
          .set('isLoadingFinished', true);
      }
      break;
    case FETCH_NOTIFICATIONS_FAILED:
      newState = state.set('notifications', [])
        .set('isLoading', false);
      break;
    default:
      return state;
  }
  return newState || state;
}
