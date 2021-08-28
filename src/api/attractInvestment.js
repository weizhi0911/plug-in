import { runtimeSendMessage } from "@u/common.js";

export const getBusiness = (data) => {
  return runtimeSendMessage("GET", "/product/business", data);
};

export const getItemPublishHistory = (data) => {
  return runtimeSendMessage("GET", "/product/itemPublishHistory", data);
};
