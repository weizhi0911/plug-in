export const getDate = () => {
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month =
    nowDate.getMonth() + 1 < 10
      ? "0" + (nowDate.getMonth() + 1)
      : nowDate.getMonth() + 1;
  const day =
    nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
  const dateStr = year + "-" + month + "-" + day;
  return dateStr;
};

export const multiBigInt = (n, p = 0) => {
  let str = n,
    i = p;
  if (typeof n === "number") {
    // .123 === 0.123
    str = `${n}`;
  }
  if (p < 0) {
    i = Math.abs(p);
  }
  const pIndex = str.indexOf(".");
  if (pIndex > 1) {
    if (str.slice(pIndex + 1).length <= i) {
      return `${str.slice(0, pIndex)}${str.slice(pIndex + 1).padEnd(i, "0")}`;
      //    return `${str.slice(0, pIndex)}${str.slice(pIndex) * 10 ** i}`
    }
    return `${str.slice(0, pIndex)}${str.slice(
      pIndex + 1,
      pIndex + 1 + i
    )}.${str.slice(pIndex + 1 + i)}`;
  }
  if (pIndex === 0 || pIndex === 1) {
    if (str.slice(pIndex + 1).length <= i) {
      return `${str * 10 ** i}`;
    }
    return `${str.slice(pIndex + 1, pIndex + 1 + i)}.${str.slice(
      pIndex + 1 + i
    )}`;
  }
  return `${str.padEnd(str.length + i, "0")}`;
};
