import Auth from '../constants/Auth';

export const login = (payload) => (dispatch) => {
  dispatch({type: Auth.LOGIN_SUCCESS, value: payload});
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

export const reset = (navigation) => (disptach) => {
  disptach({
    type: Auth.RESET,
  });
  navigation.navigate('Login');
};

// export const sendForgetPasswordVerificationCode = (payload) => (dispatch) => {
//   if(payload.success) {
//     dispatch({
//       type: Auth.FORGET_PASSWORD_VERIFICATION_CODE, value
//     })
//   }
// }

export const updateAvatar = (payload) => (dispatch) => {
  dispatch({type: Auth.UPDATE_AVATAR, payload});
};
