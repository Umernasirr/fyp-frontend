import Vibe from '../constants/Vibe';

export const createVibe = (payload) => (dispatch) => {
  dispatch({type: Vibe.CREATE_VIBE, payload});
};

export const getVibes = (payload) => (dispatch) => {
  dispatch({type: Vibe.GET_VIBES, payload});
};

export const deleteVibes = (payload) => (dispatch) => {
  dispatch({type: Vibe.REMOVE_VIBE, payload}) 
}

export const updateLikesUnlikes = (payload) => (dispatch) => {
  dispatch({type: Vibe.UPDATE_LIKES, payload});
};

export const addComment = (payload) => (dispatch) => {
  dispatch({type: Vibe.ADD_COMMENT, payload});
};

export const deleteCommentHandler = (payload) => (dispatch) => {
  dispatch({type: Vibe.REMOVE_COMMENT, payload});
};
