import { runtimeSendMessage } from "@u/common.js";

export const getCommissionInfo = (data) => {
  return runtimeSendMessage("GET", "/vip/commissionInfo", data);
};

export const genByVIPUrl = (data) => {
  return runtimeSendMessage("GET", "/vip/genByVIPUrl", data);
};
