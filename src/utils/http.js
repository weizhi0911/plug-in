import axios from 'axios';
import Qs from 'qs';

import { getHttp } from '@config/url';
import { ali, tb, business } from '@config/ip';

const cache = [ali, tb, business, 'https://shop', 'rate.taobao.com'];

const have = ['duotu.pro', 'mopan.cbdll', 'mopan.duotool'];

const getCache = url => {
  return cache.some(item => {
    return url.indexOf(item) !== -1;
  });
};
const getHave = url => {
  return have.some(item => {
    return url.indexOf(item) !== -1;
  });
};
// http request 拦截器
axios.interceptors.request.use(
  config => {
    let url = config.url;

    if (config.method === 'post' && getHave(url)) {
      config.data = Qs.stringify(config.data);
    }
    // // get参数编码
    if (config.method === 'get' && config.params) {
      url += '?';
      let keys = Object.keys(config.params);
      for (let key of keys) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`;
      }
      url = url.substring(0, url.length - 1);
      config.params = {};
    }
    config.url = url;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    if (
      response.data.rgv587_flag ||
      (response.data.ret && response.data.ret[0].indexOf('调用成功') === -1) ||
      (typeof response.data === 'string' &&
        response.data.indexOf('异常信息') !== -1)
    ) {
      const data = JSON.parse(localStorage.getItem(response.config.url));
      if (data !== null) {
        return JSON.parse(localStorage.getItem(response.config.url));
      }
    }

    if (localStorage.length > 20) {
      localStorage.clear();
    }

    if (
      (getCache(response.config.url) &&
        !localStorage.getItem(response.config.url) &&
        typeof response.data !== 'string' &&
        !response.data.rgv587_flag) ||
      (response.config.url.indexOf('rate.taobao.com') !== -1 &&
        response.data.indexOf('异常信息') === -1)
    ) {
      localStorage.setItem(response.config.url, JSON.stringify(response));
    }

    return response;
  },
  error => {
    if (error && error.response) {
      // console.log(error);
    }
    return Promise.reject(error.response);
  }
);

export const requestByGet = (url, params = {}, type = 'duotool') =>
  axios({
    method: 'get',
    url: getHttp(type) + url,
    params
  });

export const requestByPost = (url, params = {}, type = 'duotool') =>
  axios({ method: 'post', url: getHttp(type) + url, data: params });

export const requestByfile = (url, params = {}, type = 'duotool') =>
  axios({
    method: 'get',
    url: getHttp(type) + url,
    params,
    responseType: 'blob'
  });
