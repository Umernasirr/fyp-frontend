import Auth from '../constants/Auth';

export const login = (payload) => (dispatch) => {
  dispatch({type: Auth.LOGIN_API, isLoggedIn: payload});
  // dispatch(showWelComeSetting(payload));
};

export const register = (payload) => (dispatch) => {
  if (payload.success) {
    dispatch({type: Auth.REGISTER_SUCCESS, value: payload});
  } else {
    dispatch({
      type: Auth.REGISTER_FAILURE,
    });
  }
};

export const emailVerification = (payload) => (disptach) => {
  if (payload.success) {
    disptach({type: Auth.EMAIL_VERIFICATION_SUCCESS, value: payload});
  }
};