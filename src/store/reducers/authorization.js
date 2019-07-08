import { fromJS } from 'immutable';

// Actions
import {
  LOGIN_START,
  LOGIN_FINISH,
  LOGIN_FAILED,
  DO_LOGOUT,
} from '../actions/auth_actions';

const initialState = fromJS({
  isLogged: false,
  isLoginInProces: false,
  isLoginFaild: false,
  visible: false,
});

export default function authorizationReducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case LOGIN_START:
      newState = state.set('isLoginInProces', true);
      break;

    case LOGIN_FINISH:
      newState = state
        .set('isLoginFaild', false)
        .set('isLoginInProces', false)
        .set('isLogged', true);
      break;

    case LOGIN_FAILED:
      newState = state
        .set('isLoginFaild', true)
        .set('isLoginInProces', false)
        .set('isLogged', false);
      break;

    case DO_LOGOUT:
      newState = state
        .set('isLoginInProces', false)
        .set('isLogged', false);
      break;

    default:
      return state;
  }

  return newState;
}
