import Vibe from '../constants/Vibe';
import Common from '../constants/Common';

import {Store} from '../../services/store';

const initialState = {
  loading: false,
  vibes: [],
  myvibes: [],
  vibe: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Vibe.CREATE_VIBE:
      return {
        ...state,
        vibes: [action.payload, ...state.vibes],
      };
    case Vibe.GET_VIBES:
      return {
        ...state,
        vibes: payload,
        loading: false,
      };
    case Vibe.GET_VIBE:
      return {
        ...state,
        vibe: payload,
      };
    case Vibe.ADD_COMMENT:
      return {
        vibes: state.vibes.map((vibe) =>
          vibe._id === payload.postId
            ? {...vibe, comments: [...vibe.comments, payload.comment]}
            : vibe,
        ),
      };
    case Vibe.REMOVE_COMMENT:
      return {
        vibes: state.vibes.map((vibe) =>
          vibe._id === payload.postId
            ? vibe.comments.filter(
                (comment) => comment._id !== payload.commentId,
              )
            : vibe,
        ),
      };
    default:
      return state;
  }
};
