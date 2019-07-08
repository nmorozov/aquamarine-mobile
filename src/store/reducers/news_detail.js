/* HEADER_PLACEHOLDER */

import { fromJS } from 'immutable';

// Actions
import {
  NEWS_DETAIL_LOAD_START,
  NEWS_DETAIL_LOAD_FINISH,
} from '../actions/news_detail_actions';

const initialState = fromJS({
  newsDetail: {},
  isLoading: true,
});

function newsDetailsReducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case NEWS_DETAIL_LOAD_START:
      newState = initialState;
      break;

    case NEWS_DETAIL_LOAD_FINISH:
      newState = state
        .set('newsDetail', fromJS(action.payload))
        .set('isLoading', false);
      break;

    default:
      return state;
  }

  return newState;
}

export default newsDetailsReducer;
