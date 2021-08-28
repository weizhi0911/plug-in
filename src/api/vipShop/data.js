import { runtimeSendMessage } from "@u/common.js";

export const getHistory = (data) => {
  return runtimeSendMessage("GET", "/vip/history", data);
};
