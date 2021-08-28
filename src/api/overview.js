import { runtimeSendMessage } from "@u/common.js";

export const getExtendList = (data) => {
  return runtimeSendMessage("GET", "/extend/info", data);
};

export const getRank = (data) => {
  return runtimeSendMessage("GET", "/plugin/rank", data);
};
