import Request from '../constants/Request';
import Common from '../constants/Common';

import {Store} from '../../services/store';

const initialState = {
  loading: false,
  requests: [],
};

export default (state = initialState, action = {}) => {
  // console.log()
  const {payload} = action;
  console.log(payload, 'payyyyy');
  switch (action.type) {
    case Request.GET_REQUESTS:
      return {
        ...state,
        requests: action.payload,
        loading: false,
      };
    case Request.ACCEPT_REQUESTS:
      return {
        ...state,
        requests: state.requests.filter(
          (request) => request._id.toString() !== payload.requestId.toString(),
        ),
      };
    case Request.DELETE_REQUESTS:
      return {
        ...state,
        requests: state.requests.filter(
          (request) => request._id.toString() !== payload.requestId.toString(),
        ),
      };
    default:
      return state;
  }
};
