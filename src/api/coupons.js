import { runtimeSendMessage } from "@u/common.js";

export const getTodayCoupon = (data) => {
  return runtimeSendMessage("GET", "/product/todayCoupon", data);
};

export const getPriceVolume = (data) => {
  return runtimeSendMessage("GET", "/json/GetPriceVolume.do", data, "tb");
};

export const getCouponInfo = (data) => {
  return runtimeSendMessage("GET", "/plugin/couponInfo", data);
};

export const getListCoupon = (data) => {
  return runtimeSendMessage("GET", "/plugin/listCoupon", data);
};

export const getCouponInfoX = (data) => {
  return runtimeSendMessage("GET", "/plugin/getCouponInfoX", data);
};
