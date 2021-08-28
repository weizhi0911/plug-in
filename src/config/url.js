import { ali, tb, business } from "./ip";
export const GetQueryValue = (queryName, url) => {
  //淘系
  const query = url || decodeURI(window.location.search.substring(1));
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == queryName) {
      return pair[1];
    }
  }
  return null;
};

export const getCaption = (str) => {
  var index = str.lastIndexOf("-");
  str = str.substring(index + 1, str.search(".html"));
  return str;
};

export const getJd = (str) => {
  var index = str.lastIndexOf("/");
  str = str.substring(index + 1, str.search(".html"));
  return str;
};

export const urlId =
  Number(GetQueryValue("item_id")) || Number(GetQueryValue("id"));

export const vipId = getCaption(window.location.pathname);

export const jdId = getJd(window.location.pathname);

export const getHttp = (type) => {
  let http = "";
  switch (type) {
    case "duotool":
      http = process.env.VUE_APP_API_URL;
      break;
    case "ali":
      http = ali;
      break;
    case "tb":
      http = tb;
      break;
    case "business":
      http = business;
      break;
    default:
      http = "";
      break;
  }
  return http;
};
