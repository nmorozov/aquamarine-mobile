
// Core
import Request from '../../core/request';

export const NEWS_DETAIL_LOAD_START = 'NEWS_DETAIL_LOAD_START';
export const NEWS_DETAIL_LOAD_FINISH = 'NEWS_DETAIL_LOAD_FINISH';

const newsDetailLoadStart = () => ({ type: NEWS_DETAIL_LOAD_START });
const newsDetailLoadFinish = payload => ({ type: NEWS_DETAIL_LOAD_FINISH, payload });

export function getNewsDetail(newsId) {
  return (dispatch) => {
    dispatch(newsDetailLoadStart());

    Request.doGetInterlanContent('doGetDetailNews', { data_id: newsId })
      .then((response) => {
        dispatch(newsDetailLoadFinish(response));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
