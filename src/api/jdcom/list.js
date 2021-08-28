import { runtimeSendMessage } from '@u/common.js';

export const getBatchDetail = data => {
  return runtimeSendMessage('GET', '/jd/batchDetail?' + data);
};