/* HEADER_PLACEHOLDER */

import { fromJS } from 'immutable';

// Actions
import {
  CAMERA_LOAD_START,
  CAMERA_LOAD_FINISH,
  FAVORITE_LOAD_START,
  FAVORITE_LOAD_FINISH,
} from '../actions/camera_actions';

const initialState = fromJS({
  camera: {},
  isLoading: true,
});

function cameraReducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case CAMERA_LOAD_START:
      newState = initialState;
      break;

    case CAMERA_LOAD_FINISH:
      newState = state
        .set('camera', fromJS(action.payload))
        .set('isLoading', false);
      break;

    case FAVORITE_LOAD_START:
      newState = state
        .set('isLoading', true);
      break;

    case FAVORITE_LOAD_FINISH:
      newState = state
        .set('isLoading', false);
      break;

    default:
      return state;
  }

  return newState;
}

export default cameraReducer;
