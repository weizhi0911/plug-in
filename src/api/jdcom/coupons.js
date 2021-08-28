import { runtimeSendMessage } from '@u/common.js';

export const getService = data => {
  return runtimeSendMessage(
    'GET',
    'https://item-soa.jd.com/getWareBusiness',
    data,
    ''
  );
};

export const getCouponList = data => {
  return runtimeSendMessage(
    'GET',
    '/jd/coupon',
    data
  );
};

export const getCouponQuery = data => {
  return runtimeSendMessage(
    'GET',
    '/jd/couponQuery',
    data
  );
};

export const getCouponName = url => {
  return runtimeSendMessage(
    'GET',
    url,
    {},
    ''
  );
};