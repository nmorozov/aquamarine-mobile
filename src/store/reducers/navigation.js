import _ from 'lodash';

// Navigation
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../../navigators/AppNavigator';


// Core
import Config, { PARAM_ACCESS_TOKEN } from '../../core/config';

let path = 'Home';

if (_.isNil(Config.get(PARAM_ACCESS_TOKEN)) || Config.get(PARAM_ACCESS_TOKEN) === '') {
  path = 'Login';
}

const loginAction = AppNavigator.router.getActionForPathAndParams(path);
const initialNavState = AppNavigator.router.getStateForAction(loginAction);

const getCurrentRouteName = (state) => {
  const route = state.routes[state.index];
  return typeof route.index === 'undefined' ? route.routeName : getCurrentRouteName(route);
};

export default function navigatorReducer(state = initialNavState, action) {
  let nextState;
  let params;

  switch (action.type) {
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }));
      break;
    case 'Logout':
      nextState = initialNavState;
      break;
    case 'Home':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Home' }));
      break;
    case 'Widgets':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Widgets' }), state);
      break;
    case 'Security':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Security', params: { activeSection: 'Security' } }));
      break;
    case 'Cameras':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Cameras', params: { activeSection: 'Cameras' } }));
      break;
    case 'Camera':
      params = { ...{ activeSection: 'Cameras' }, ...action.params };
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Camera', params }), state);
      break;
    case 'DetailNewsPage':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DetailNewsPage', params: action.params }), state);
      break;
    case 'DetailNotificationPage':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DetailNotificationPage', params: action.params }), state);
      break;
    case 'DetailPromotionPage':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DetailPromotionPage', params: action.params }), state);
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  if (state && nextState) {
    const stateRouteName = getCurrentRouteName(state);
    const nextStateRouteName = getCurrentRouteName(nextState);
    return stateRouteName === nextStateRouteName ? state : nextState;
  }

  return nextState || state;
}
