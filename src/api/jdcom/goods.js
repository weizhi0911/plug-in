import { runtimeSendMessage } from "@u/common.js";

export const getJdList = (data) => {
  return runtimeSendMessage("GET", "https://item-soa.jd.com/getWareBusiness", data, "");
};

export const getStock= (data) => {
  return runtimeSendMessage("GET", "https://c0.3.cn/stock", data, "");
};
