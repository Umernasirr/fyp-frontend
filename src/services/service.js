import {api} from './apiService';
import {Store} from './store';
// const model = 'auth';
export const service = {
  login: (data) => {
    console.log(data, 'dataaa');
    return api.invoke('POST', `auth/login`, data);
  },
  register: (data) => {
    return api.invoke('POST', `auth/register`, data);
  },
  verifyEmail: (data) => {
    return api.invoke('POST', 'auth/email-verification', data);
  },
};
