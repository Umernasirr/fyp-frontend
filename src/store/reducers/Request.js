import Request from '../constants/Request';
import Common from '../constants/Common';

import {Store} from '../../services/store';

const initialState = {
  loading: false,
  requests: [],
};

export default (state = initialState, action = {}) => {
  const {payload} = action;
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
    case Request.CLEAR_REQUEST:
      return{
        loading: false,
        requests: [],
      }
    default:
      return state;
  }
};
