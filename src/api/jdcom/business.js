import { runtimeSendMessage } from '@u/common.js';

export const getShopInfo = data => {
  return runtimeSendMessage(
    'GET',
    'https://union.jd.com/api/shop/queryShopInfo',
    data,
    ''
  );
};
