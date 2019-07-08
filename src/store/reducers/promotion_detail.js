/* HEADER_PLACEHOLDER */

import { fromJS } from 'immutable';

// Actions
import {
  PROMOTION_DETAIL_LOAD_START,
  PROMOTION_DETAIL_LOAD_FINISH,
} from '../actions/promotion_detail_actions';

const initialState = fromJS({
  promotionDetail: {},
  isLoading: true,
});

function promotionDetailsReducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case PROMOTION_DETAIL_LOAD_START:
      newState = initialState;
      break;

    case PROMOTION_DETAIL_LOAD_FINISH:
      newState = state
        .set('promotionDetail', fromJS(action.payload))
        .set('isLoading', false);
      break;

    default:
      return state;
  }

  return newState;
}

export default promotionDetailsReducer;
