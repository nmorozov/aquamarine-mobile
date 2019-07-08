import { Alert } from 'react-native';
import Request from '../../core/request';
import ResponseMessagesTranslator from '../../core/responseMessagesTranslator';

export const FETCH_NUMBERS_START = 'FETCH_NUMBERS_START';
export const FETCH_NUMBERS_FINISH = 'FETCH_NUMBERS_FINISH';
export const FETCH_NUMBERS_FAILED = 'FETCH_NUMBERS_FAILED';
export const SHOW_POPUP = 'SHOW_POPUP';
export const HIDE_POPUP = 'HIDE_POPUP';

const fetchNumbersStart = payload => ({
  type: FETCH_NUMBERS_START,
  payload
});

const fetchNumbersFinish = payload => ({
  type: FETCH_NUMBERS_FINISH,
  payload
});

const fetchNumbersFailed = payload => ({
  type: FETCH_NUMBERS_FAILED,
  payload
});

const addNumber = payload => ({
  type: SHOW_POPUP,
  payload
});

const hideNumber = payload => ({
  type: HIDE_POPUP,
  payload
});

export function fetchNumbers(from) {
  return (dispatch) => {
    dispatch(fetchNumbersStart(from));

    const pagination = {
      ...{ offset: from },
    };
    Request.doGetInterlanContent('doGetNumbers', pagination)
      .then((response) => {
        dispatch(fetchNumbersFinish(response));
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Ошибка', ResponseMessagesTranslator('Network request failed'));
        dispatch(fetchNumbersFailed());
      });
  };
}

export function createNumber(data) {
  return (dispatch) => {
    dispatch(fetchNumbersStart(0));

    const pagination = {
      ...{ offset: 0 },
    };
    Request.doGetInterlanContent('doCreateNumber', data)
      .then(() => {
        console.log(123);
        return Request.doGetInterlanContent('doGetNumbers', pagination);
      })
      .then((response) => {
        dispatch(fetchNumbersFinish(response));
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Ошибка', ResponseMessagesTranslator('Network request failed'));
        dispatch(fetchNumbersFailed());
      });
  };
}

export function updateNumber(data) {
  return (dispatch) => {
    dispatch(fetchNumbersStart(0));

    const pagination = {
      ...{ offset: 0 },
    };
    Request.doGetInterlanContent('doUpdateNumber', data)
      .then(() => {
        return Request.doGetInterlanContent('doGetNumbers', pagination)
        .then((response) => {
          dispatch(fetchNumbersFinish(response));
        });
      })
      .catch((error) => {
        Alert.alert('Ошибка', ResponseMessagesTranslator('Network request failed'));
        dispatch(fetchNumbersFailed());
      });
  };
}

export function deleteNumber(data) {
  return (dispatch) => {
    dispatch(fetchNumbersStart(0));

    const pagination = {
      ...{ offset: 0 },
    };
    Request.doGetInterlanContent('doDeleteNumber', data)
      .then(() => {
        return Request.doGetInterlanContent('doGetNumbers', pagination);
      })
      .then((response) => {
        dispatch(fetchNumbersFinish(response));
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Ошибка', ResponseMessagesTranslator('Network request failed'));
        dispatch(fetchNumbersFailed());
      });
  };
}

export function аddNumberTrigger() {
  return (dispatch) => {
    dispatch(addNumber());
  };
}

export function hideNewNumber() {
  return (dispatch) => {
    dispatch(hideNumber());
  };
}
