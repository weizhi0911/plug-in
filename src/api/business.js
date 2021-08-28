import { runtimeSendMessage } from "@u/common.js";

export const getHtml = (id) => {
  return runtimeSendMessage("GET", `https://shop${id}.taobao.com/`, {}, "html");
};

export const getEncryptHtml = (encryptId) => {
  return runtimeSendMessage(
    "GET",
    `https://rate.taobao.com/user-rate-${encryptId}.htm`,
    {},
    "html"
  );
};

export const getdetail = (data) => {
  return runtimeSendMessage(
    "GET",
    "/h5/mtop.taobao.detail.getdetail/6.0",
    data,
    "business"
  );
};

export const getJhsHtml = (url) => {
  return runtimeSendMessage("GET", url, {}, "html");
};

export const getSellerContact = (data) => {
  return runtimeSendMessage("GET", "/plugin/getSellerContact", data);
};

export const getShopinfo = (data) => {
  return runtimeSendMessage("GET", "/shopdetail/shopinfo.json", data, "ali");
};
export const getSellerCaptcha = (data) => {
  return runtimeSendMessage("GET", "/plugin/getSellerCaptcha", data);
};

export const postBusinessFeedback = (data) => {
  return runtimeSendMessage("POST", "/extend/businessFeedback", data);
};
