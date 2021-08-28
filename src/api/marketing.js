import { runtimeSendMessage } from "@u/common.js";

export const getItemTlj = (data) => {
  return runtimeSendMessage("GET", "/plugin/itemTlj", data);
};

export const getSelectedList = (data) => {
  return runtimeSendMessage("GET", "/extend/getContentMaterial", data);
};

export const getItemVideo = (data) => {
  return runtimeSendMessage("GET", "/plugin/itemVideo", data);
};

export const getPicsMaterial = (data) => {
  return runtimeSendMessage("GET", "/extend/getPicsMaterial", data);
};

export const getItemRelate = (data) => {
  return runtimeSendMessage("GET", "/plugin/itemRelate", data);
};
