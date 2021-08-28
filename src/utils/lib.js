export const lineBreakToBrTag = (str, symbol = '<br>') =>
  str.replace(/\r|\n|\r\n/gi, symbol);

/* eslint-disable */
export const urlToATag = (str, target = '_blank') =>
  str.replace(
    /((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/gi,
    (url, ...args) => {
      return args[0]
        ? '<a href="' + url + '" target="' + target + '">' + url + '</a>'
        : url;
    }
  );
/* eslint-enable */

export const removeChinese = strValue => {
  if (strValue != null && strValue != '') {
    var reg = /[\u4e00-\u9fa5]/g;
    // console.log(new RegExp(/[\u4e00-\u9fa5]/).match(strValue));
    return strValue.replace(reg, '');
  } else return '';
};

export const getChinese = strValue => {
  if (strValue != null && strValue != '') {
    var reg = /[\u4e00-\u9fa5]/g;
    return strValue.match(reg).join('');
  } else return '';
};

export const getInfo = (source, start, end) => {
  const oReg = new RegExp(start + '.*?' + end);
  const oRegStart = new RegExp(start, 'g');
  const oRegEnd = new RegExp(end, 'g');

  if (!source.match(oReg)) {
    return false;
  }
  return source
    .match(oReg)
    .join('=')
    .replace(oRegStart, '')
    .replace(oRegEnd, '')
    .split('=')[0];
};
