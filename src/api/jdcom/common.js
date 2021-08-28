import { runtimeSendMessage } from '@u/common.js';

export const getUserInfoForMiniJd = data => {
  return runtimeSendMessage(
    'GET',
    'https://passport.jd.com/loginservice.aspx',
    data,
    ''
  );
};
