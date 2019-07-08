import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import navigationReducer from './reducers/navigation';
import authorizationReducer from './reducers/authorization';
import newsReducer from './reducers/news';
import notificationsReducer from './reducers/notification';
import newsDetailReducer from './reducers/news_detail';
import notificationDetailReducer from './reducers/notification_detail';
import camerasReducer from './reducers/cameras';
import cameraReducer from './reducers/camera';
import promotionsReducer from './reducers/promotions';
import promotionDetailReducer from './reducers/promotion_detail';
import numbers from './reducers/numbers';

const appReducers = combineReducers({
  navigationReducer,
  authorizationReducer,
  newsReducer,
  notificationsReducer,
  newsDetailReducer,
  notificationDetailReducer,
  camerasReducer,
  cameraReducer,
  promotionsReducer,
  promotionDetailReducer,
  numbers,
});

const configureStore = (initialState) => {
  const develop = compose(
    applyMiddleware(thunk),
    global.reduxNativeDevTools ?
      global.reduxNativeDevTools() :
      noop => noop,
  );

  const production = compose(applyMiddleware(thunk));

  const store = createStore(appReducers, initialState, global.__DEV__ ? develop : production);
  if (global.reduxNativeDevTools) {
    global.reduxNativeDevTools.updateStore(store);
  }
  return store;
};

const store = configureStore();

export default store;
