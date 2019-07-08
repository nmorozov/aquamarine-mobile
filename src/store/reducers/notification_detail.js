/* HEADER_PLACEHOLDER */

import { fromJS } from 'immutable';

// Actions
import {
  NOTIFICATION_DETAIL_LOAD_START,
  NOTIFICATION_DETAIL_LOAD_FINISH,
} from '../actions/notification_detail_actions';

const initialState = fromJS({
  notificationDetail: {},
  isLoading: true,
});

function notificationDetailsReducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case NOTIFICATION_DETAIL_LOAD_START:
      newState = initialState;
      break;

    case NOTIFICATION_DETAIL_LOAD_FINISH:
      newState = state
        .set('notificationDetail', fromJS(action.payload))
        .set('isLoading', false);
      break;

    default:
      return state;
  }

  return newState;
}

export default notificationDetailsReducer;
