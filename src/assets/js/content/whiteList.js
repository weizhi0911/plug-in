import { jurisdiction, coupons, vipShop,jdcom } from "@config/jurisdiction";

export const permissionWebsite = () => {
  return jurisdiction.some((item) => {
    return window.location.host.indexOf(item) !== -1;
  });
};

export const permissionCoupons = () => {
  return coupons.some((item) => {
    return window.location.host.indexOf(item) !== -1;
  });
};

export const permissionVipShop = () => {
  return vipShop.some((item) => {
    return window.location.host.indexOf(item) !== -1;
  });
};


export const permissionJdcom = ()=>{
  return jdcom.some((item) => {
    return window.location.host.indexOf(item) !== -1;
  });
}