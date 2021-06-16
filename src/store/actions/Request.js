import Request from '../constants/Request';

export const getRequests = (payload) => (dispatch) => {
  dispatch({type: Request.GET_REQUESTS, payload: payload});
  // dispatch(showWelComeSetting(payload));
};

export const deleteRequests = (payload) => (dispatch) => {
  dispatch({type: Request.DELETE_REQUESTS, payload});
};
