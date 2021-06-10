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
