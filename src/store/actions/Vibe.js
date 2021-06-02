import Vibe from '../constants/Vibe';

export const createVibe = (payload) => (dispatch) => {
  dispatch({type: Vibe.CREATE_VIBE, payload});
  // dispatch(showWelComeSetting(payload));
};
