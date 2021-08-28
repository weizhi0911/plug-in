import { runtimeSendMessage } from '@u/common.js';

export const getCode = data => {
  return runtimeSendMessage(
    'POST',
    'https://union.jd.com/api/receivecode/getCode',
    data,
    ''
  );
};

export const getInfo = data => {
  return runtimeSendMessage(
    'GET',
    '/jd/commissionInfo',
    data,
  );
};

export const getQueryPlanList = data => {
  return runtimeSendMessage(
    'GET',
    'https://union.jd.com/api/plan/queryPlanList',
    data,
    ''
  );
};

export const getQueryShopPlanList = data => {
  return runtimeSendMessage(
    'GET',
    'https://union.jd.com/api/shop/queryShopPlanList',
    data,
    ''
  );
};

export const getQueryPlanInfo = data => {
  return runtimeSendMessage(
    'GET',
    'https://union.jd.com/api/plan/queryPlanInfo',
    data,
    ''
  );
};


export const getSearch = data => {
  return runtimeSendMessage(
    'POST',
    'https://union.jd.com/api/goods/search',
    data,
    ''
  );
};