import { fromJS } from 'immutable';

import { FETCH_PROMOTIONS_START, FETCH_PROMOTIONS_FINISH, FETCH_PROMOTIONS_FAILED, LOAD_PROMOTIONS_LIMIT } from '../actions/promotions_actions';

const initialState = fromJS({
  promotions: [],
  offset: 0,
  isLoading: false,
  isLoadingFinished: false,
});

export default function promotionsReducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case FETCH_PROMOTIONS_START:
      if (action.from === 0) {
        newState = state.set('promotions', [])
          .set('loadFrom', 0)
          .set('isLoading', true)
          .set('isLoadingFinished', false);
      } else {
        newState = state.set('isLoading', true);
      }
      break;
    case FETCH_PROMOTIONS_FINISH:
      if (action.payload.length > 0) {
        newState = state.set('isLoading', false)
          .update('promotions', value => value.concat(action.payload))
          .update('loadFrom', value => value + action.payload.length)
          .set(
            'isLoadingFinished',
            action.payload.length !== LOAD_PROMOTIONS_LIMIT,
          );
      } else {
        newState = state.set('isLoading', false)
          .set('isLoadingFinished', true);
      }
      break;
    case FETCH_PROMOTIONS_FAILED:
      newState = state.set('promotions', [])
        .set('isLoading', false);
      break;
    default:
      return state;
  }
  return newState || state;
}
