import Axios from 'axios';
import {baseurl} from '../store/constants/baseurl';
// import {Popup} from '../uiComponents/index';

import {Store} from './store';
// const FileUpload = require('react-fileupload');
// want don't use so run 'npm uninstall --save react-fileupload'
// Add a request interceptor
// Axios.interceptors.request.use(
//   function (config) {
//     console.log('config.progress', config.progress);
//     if (config.progress) {
//       Popup.show({
//         progressBar: true,
//       });
//     }
//     // Do something before request is sent
//     console.log('request interceptor');
//     return config;
//   },
//   function (error) {
//     Popup.hide();
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );

// Add a response interceptor
// Axios.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     console.log('response interceptor');
//     Popup.hide();
//     return response;
//   },
//   function (error) {
//     Popup.hide();
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   },
// );
Axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
export const api = {
  invoke: (method, url, data = {}, token = Store.getUserToken(null)) => {
    let progress = data && data.progress === false ? data.progress : true;
    let param = null;
    if (method.toLowerCase() == 'get') {
      param = data;
      data = null;
    }

    // console.log(Store.ge);
    return Axios({
      url: url,
      progress: progress,
      baseURL: baseurl,
      method: method,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: param,
      data: data,
    }).catch((error) => {
      console.log(error.response);
      return error.response;
    });
  },
  uploadFormData: (url, data = {}, token = Store.getUserToken(null)) => {
    const config = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };
    return Axios({
      url: url,
      baseURL: baseurl,
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    }).catch((error) => {
      return error.response;
    });
  },
};
