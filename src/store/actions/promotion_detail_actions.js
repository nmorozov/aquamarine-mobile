// Core
import Request from '../../core/request';

export const PROMOTION_DETAIL_LOAD_START = 'PROMOTION_DETAIL_LOAD_START';
export const PROMOTION_DETAIL_LOAD_FINISH = 'PROMOTION_DETAIL_LOAD_FINISH';

const promotionDetailLoadStart = () => ({ type: PROMOTION_DETAIL_LOAD_START });
const promotionDetailLoadFinish = payload => ({ type: PROMOTION_DETAIL_LOAD_FINISH, payload });

export function getPromotionDetail(promotionId) {
  return (dispatch) => {
    dispatch(promotionDetailLoadStart());

    Request.doGetInterlanContent('doGetDetailPromotion', { data_id: promotionId })
      .then((response) => {
        dispatch(promotionDetailLoadFinish(response));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
