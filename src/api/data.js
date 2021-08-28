import { runtimeSendMessage } from "@u/common.js";

export const getLine = (data) => {
  return runtimeSendMessage("GET", "/extend/chart", data);
};
