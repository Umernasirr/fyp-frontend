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
};
