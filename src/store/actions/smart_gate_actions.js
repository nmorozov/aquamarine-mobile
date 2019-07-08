// Core
import Request from '../../core/request';

export function openSmartGate() {
  return (dispatch) => {
    Request.doGetInterlanContent('doOpenSmartGate')
      .catch((err) => {
        console.log(err);
      });
  };
}
