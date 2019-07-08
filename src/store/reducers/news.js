import { fromJS } from 'immutable';

import { FETCH_NEWS_START, FETCH_NEWS_FINISH, FETCH_NEWS_FAILED, LOAD_NEWS_LIMIT } from '../actions/news_actions';

const initialState = fromJS({
  news: [],
  offset: 0,
  isLoading: false,
  isLoadingFinished: false,
});

export default function newsReducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case FETCH_NEWS_START:
      if (action.from === 0) {
        newState = state.set('news', [])
          .set('loadFrom', 0)
          .set('isLoading', true)
          .set('isLoadingFinished', false);
      } else {
        newState = state.set('isLoading', true);
      }
      break;
    case FETCH_NEWS_FINISH:
      if (action.payload.length > 0) {
        newState = state.set('isLoading', false)
          .update('news', value => value.concat(action.payload))
          .update('loadFrom', value => value + action.payload.length)
          .set(
            'isLoadingFinished',
            action.payload.length !== LOAD_NEWS_LIMIT,
          );
      } else {
        newState = state.set('isLoading', false)
          .set('isLoadingFinished', true);
      }
      break;
    case FETCH_NEWS_FAILED:
      newState = state.set('news', [])
        .set('isLoading', false);
      break;
    default:
      return state;
  }
  return newState || state;
}
