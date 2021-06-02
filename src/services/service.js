import {api} from './apiService';
import {Store} from './store';
// const model = 'auth';
export const service = {
  login: (data) => {
    return api.invoke('POST', `auth/login`, data);
  },
  register: (data) => {
    return api.invoke('POST', `auth/register`, data);
  },
  verifyEmail: (data) => {
    return api.invoke('POST', 'auth/email-verification', data);
  },

  getSongs: () => {
    return api.invoke('GET', 'song');
  },

  getUsers: () => {
    return api.invoke('GET', 'auth/get-users');
  },
  sendForgetPasswordVerificationCode: (data) => {
    return api.invoke(
      'POST',
      'auth/send-forget-password-verification-code',
      data,
    );
  },
  resendForgetPasswordVerificationCode: (data) => {
    return api.invoke(
      'PUT',
      'auth/resend-forget-password-verification-code',
      data,
    );
  },
  resendEmailVerificationCode: () => {
    return api.invoke('PUT', 'auth/resend-email-verification-code');
  },
  verifyForgetPasswordVerificationCode: (data) => {
    return api.invoke(
      'POST',
      'auth/verify-forget-password-verification-code',
      data,
    );
  },
  updatePasswordAfterVerificationCode: (data) => {
    return api.invoke(
      'PUT',
      'auth/update-password-after-verification-code',
      data,
    );
  },
  createVibe: (data) => {
    console.log(data, 'data');
    return api.uploadFormData('vibe/create-vibe', data);
  },
};
