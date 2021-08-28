/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:
 * @Modifier:过滤器
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 10:48:37
 * @LastEditTime: 2020-02-26 16:16:01
 */
export const none = (value, str = "--") => {
  return !value || Number(value) === 0 ? str : value;
};

export default [
  {
    name: "protocol",
    fn(value) {
      return value.replace(/https?:/, "");
    },
  },
  {
    name: "rank",
    fn(value, page, pageCount, start = 1) {
      return value + start + (page - 1) * pageCount;
    },
  },
  {
    name: "none",
    fn: none,
  },
  {
    name: "mobile",
    fn(value) {
      return value.slice(0, 3) + "****" + value.slice(7);
    },
  },
  {
    name: "empty",
    fn(value) {
      return value !== "" && value !== undefined ? value : "无";
    },
  },
];
