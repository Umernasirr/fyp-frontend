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
          vibe._id === payload.vibeId
            ? vibe.comments.filter(
                (comment) => comment._id !== payload.commentId,
              )
            : vibe,
        ),
      };
    case Vibe.REMOVE_VIBE:
      return {
        vibes: state.vibes.filter((vibe) => vibe._id !== payload.vibeId),
      };
    case Vibe.UPDATE_LIKES:
      return {
        vibes: state.vibes.map((vibe) =>
          vibe._id === payload.vibeId
            ? vibe.likes.contain(payload.userId.toString())
              ? vibe.likes.filter(
                  (like) =>
                    like.userId.toString() !== payload.userId.toString(),
                )
              : {...vibe, likes: [...vibe.likes, payload.userId]}
            : vibe,
        ),
      };
    default:
      return state;
  }
};
