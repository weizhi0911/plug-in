import { runtimeSendMessage } from "@u/common.js";

export const getjdHistory = (data) => {
  return runtimeSendMessage("GET", "/jd/history", data);
};
