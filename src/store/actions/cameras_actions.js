// React
import { Alert } from 'react-native';

import Request from '../../core/request';

import ResponseMessagesTranslator from '../../core/responseMessagesTranslator';

export const FETCH_CAMERAS_START = 'fetch_cameras_start';
export const FETCH_CAMERAS_FINISH = 'fetch_cameras_finish';
export const FETCH_CAMERAS_FAILED = 'fetch_cameras_failed';

export const LOAD_CAMERAS_LIMIT = 10;

const fetchCamerasStart = from => ({ type: FETCH_CAMERAS_START, from });
const fetchCamerasFinish = payload => ({ type: FETCH_CAMERAS_FINISH, payload });
const fetchCamerasFailed = () => ({ type: FETCH_CAMERAS_FAILED });

export function fetchCameras(from, params = {}) {
  return (dispatch) => {
    dispatch(fetchCamerasStart(from));

    const pagination = {
      ...params,
      ...{ offset: from },
    };
    Request.doGetInterlanContent('doGetCameras', pagination)
      .then((response) => {
        dispatch(fetchCamerasFinish(response));
      })
      .catch(() => {
        Alert.alert('Ошибка', ResponseMessagesTranslator('Network request failed'));
        dispatch(fetchCamerasFailed());
      });
  };
}
