import {Songs} from '../../constants';

export const login = (payload) => (dispatch) => {
  dispatch({type: Songs.GET_SONGS, songList: payload});
};
