import Vibe from '../constants/Vibe';

export const createVibe = (payload) => (dispatch) => {
  dispatch({type: Vibe.CREATE_VIBE, payload});
};

export const getVibes = (payload) => (dispatch) => {
  dispatch({type: Vibe.GET_VIBES, payload});
};

export const updateLikesUnlikes = (payload) => (dispatch) => {
  console.log(payload);
  dispatch({type: Vibe.UPDATE_LIKES, payload});
};

export const addComment = (payload) => (dispatch) => {
  dispatch({type: Vibe.ADD_COMMENT, payload});
};

export const deleteCommentHandler = (payload) => (dispatch) => {
  console.log('comign here');
  dispatch({type: Vibe.REMOVE_COMMENT, payload});
};
