import Auth from '../constants/Auth';
import Common from '../constants/Common';

import {Store} from '../../services/store';

const initialState = {
  logoutLoading: false,
  loading: false,
  isLoggedIn: false,
  isRegistered: true,
  verfication: false,
  user: {},
  token: '',
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Auth.LOGIN_SUCCESS:
      Store.setUserToken(action.value.token);
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        isRegistered: true,
        verification: true,
        user: action.value.user,
        token: action.value.token,
      };
    case Auth.REGISTER_SUCCESS:
      Store.setUserToken(action.value.token);
      return {
        ...state,
        loading: false,
        verification: false,
        isRegistered: true,
        user: action.value.user,
        token: action.value.token,
      };

    case Auth.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        verification: false,
        isRegistered: false,
        user: {},
      };
    case Auth.EMAIL_VERIFICATION_SUCCESS:
      Store.remove('accessToken');
      return {
        logoutLoading: false,
        loading: false,
        isLoggedIn: false,
        isRegistered: true,
        verfication: false,
        user: {},
        token: '',
      };
    case Auth.RESET:
      return {
        logoutLoading: false,
        loading: false,
        isLoggedIn: false,
        isRegistered: true,
        verfication: false,
        user: {},
        token: '',
      };
      case Auth.UPDATE_AVATAR:
        return{
          ...state,
          user: action.payload 
        }
    default:
      return state;
  }
};
