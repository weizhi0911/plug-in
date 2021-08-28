import { runtimeSendMessage } from "@u/common.js";

export const getTetail = (data) => {
  return runtimeSendMessage("GET", "https://stock.vip.com/detail/", data, "");
};
