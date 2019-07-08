import { fromJS } from 'immutable';

import { FETCH_CAMERAS_START, FETCH_CAMERAS_FINISH, FETCH_CAMERAS_FAILED, LOAD_CAMERAS_LIMIT } from '../actions/cameras_actions';

const initialState = fromJS({
  cameras: [],
  offset: 0,
  isLoading: false,
  isLoadingFinished: false,
});

export default function camerasReducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case FETCH_CAMERAS_START:
      if (action.from === 0) {
        newState = state.set('cameras', [])
          .set('loadFrom', 0)
          .set('isLoading', true)
          .set('isLoadingFinished', false);
      } else {
        newState = state.set('isLoading', true);
      }
      break;
    case FETCH_CAMERAS_FINISH:
      if (action.payload.length > 0) {
        newState = state.set('isLoading', false)
          .update('cameras', value => value.concat(action.payload))
          .update('loadFrom', value => value + action.payload.length)
          .set(
            'isLoadingFinished',
            action.payload.length !== LOAD_CAMERAS_LIMIT,
          );
      } else {
        newState = state.set('isLoading', false)
          .set('isLoadingFinished', true);
      }
      break;
    case FETCH_CAMERAS_FAILED:
      newState = state.set('cameras', [])
        .set('isLoading', false);
      break;
    default:
      return state;
  }
  return newState || state;
}
