/* HEADER_PLACEHOLDER */

import { fromJS } from 'immutable';

// Actions
import {
    FETCH_NUMBERS_START,
    FETCH_NUMBERS_FINISH,
    FETCH_NUMBERS_FAILED,
    SHOW_POPUP,
    HIDE_POPUP,
    LOAD_NUMBERS_LIMIT,
} from '../actions/numbers_actions';

const initialState = fromJS({
  addNumber: false,
  numbers: [],
  loadFrom: 0,
  isLoading: false,
  isLoadingFinished: true,
});

function numbersReducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case FETCH_NUMBERS_START:
      if (action.from === 0) {
        newState = state.set('loadFrom', 0)
          .set('isLoading', true)
          .set('isLoadingFinished', false);
      } else {
        newState = state.set('isLoading', true);
      }
      break;
    case FETCH_NUMBERS_FINISH:
      if (action.payload.length > 0) {
        newState = state.set('isLoading', false)
          .set('numbers', action.payload)
          .update('loadFrom', value => value + action.payload.length)
          .set(
            'isLoadingFinished',
            action.payload.length !== LOAD_NUMBERS_LIMIT,
          );
      } else {
        newState = state.set('isLoading', false)
          .set('isLoadingFinished', true);
      }
      break;
    case FETCH_NUMBERS_FAILED:
      newState = state.set('numbers', [])
        .set('isLoading', false);
      break;

    case HIDE_POPUP:
      newState = state.set('addNumber', false);
      break;

    case SHOW_POPUP:
      newState = state.set('addNumber', true);
      break;

    default:
      return state;
  }

  return newState;
}

export default numbersReducer;
