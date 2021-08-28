import { runtimeSendMessage } from "@u/common.js";

export const getPlatformItem = (data) => {
  return runtimeSendMessage("GET", "/extend/platformItem", data);
};

export const getPromoteHistoryByHour = (data) => {
  return runtimeSendMessage("GET", "/promotion/hourdata", data);
};

export const getPromoteHistoryByDay = (data) => {
  return runtimeSendMessage("GET", "/promotion/daydata", data);
};
