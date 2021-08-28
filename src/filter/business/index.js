export const toDecimal = (value, bit = 1) => {
  if (value >= 0 && value < 1) {
    return "0." + "".padEnd(bit, "0");
  }
};
export default [
  {
    name: "earn",
    fn(value) {
      return toDecimal(value, 2);
    },
  },
  {
    name: "coupon",
    fn(value, rate = 100) {
      return (value > 0 ? "￥" + Math.floor(value / rate) : "暂无") + "券";
    },
  },
  {
    name: "couponId",
    fn(value, symbol = "***") {
      const strValue = String(value);

      return (
        strValue.slice(0, 5) + symbol + strValue.slice(strValue.length - 5)
      );
    },
  },
];
