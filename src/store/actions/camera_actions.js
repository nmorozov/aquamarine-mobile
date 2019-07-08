
// Core
import Request from '../../core/request';

import { fetchCameras } from './cameras_actions';

export const CAMERA_LOAD_START = 'CAMERA_LOAD_START';
export const CAMERA_LOAD_FINISH = 'CAMERA_LOAD_FINISH';
export const FAVORITE_LOAD_START = 'FAVORITE_LOAD_START';
export const FAVORITE_LOAD_FINISH = 'FAVORITE_LOAD_FINISH';

const cameraLoadStart = () => ({ type: CAMERA_LOAD_START });
const cameraLoadFinish = payload => ({ type: CAMERA_LOAD_FINISH, payload });
const favoriteLoadStart = () => ({ type: FAVORITE_LOAD_START });

export function getCamera(cameraId) {
  return (dispatch) => {
    dispatch(cameraLoadStart());

    Request.doGetInterlanContent('doGetCamera', { data_id: cameraId })
      .then((response) => {
        dispatch(cameraLoadFinish(response));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function toggleFavorite(cameraId, favorite) {
  return (dispatch) => {
    dispatch(favoriteLoadStart());

    Request.doGetInterlanContent(favorite ? 'removeFavorite' : 'addFavorite', { data_id: cameraId })
      .then((response) => {
        return Request.doGetInterlanContent('doGetCamera', { data_id: cameraId })
      })
      .then((response) => {
        dispatch(fetchCameras(0));
        dispatch(cameraLoadFinish(response));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
