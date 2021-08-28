import Vue from "vue";

const md5key = "0617074f8ba574db341b7f82f477a15a";

const sha1key = "Fj|uU920fsJ19fk1610699564624";

export const sort = (params) => {
  let str = "";
  const sortParams = Object.keys(params).sort();
  sortParams.map((item) => {
    str += item + params[item];
  });
  return str;
};

export const parameterMd5Encryption = (params) => {
  return Vue.prototype.$md5(sort(params) + md5key);
};

export const parameterSha1Encryption = (params) => {
  return Vue.prototype.$sha1(sort(params) + sha1key);
};

export const sign = (option) => {
  return Vue.prototype.$md5(
    parameterMd5Encryption(option) + parameterSha1Encryption(option) + md5key
  );
};
